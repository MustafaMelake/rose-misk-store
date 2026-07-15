"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { calculateShippingFee } from "../../lib/shipping";
import {
  getCurrentUser,
  requireUser,
  requireAdmin,
  PublicError,
  toPublicMessage,
} from "@/lib/auth-guards";

export type OrderStatusType =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "AWAITING_PAYMENT";

/** Convert Prisma.Decimal (or number) into a plain number for the client. */
function toNumber(value: Prisma.Decimal | number | null | undefined): number {
  return value == null ? 0 : Number(value);
}

export async function createOrder(
  orderData: any,
  items: { id: number; size: string; quantity: number }[]
) {
  try {
    // Identity is derived from the session, never from the client.
    // A null user is a valid guest checkout.
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ?? null;

    const result = await prisma.$transaction(async (tx) => {
      let serverTotal = new Prisma.Decimal(0);
      const orderItemsToCreate = [];

      for (const item of items) {
        const variant = await tx.productVariant.findFirst({
          where: { productId: item.id, volume: item.size },
        });

        if (!variant || variant.stock < item.quantity) {
          throw new PublicError(
            `المنتج ذو الحجم ${item.size} غير متوفر بالكمية المطلوبة.`
          );
        }

        const unitPrice = new Prisma.Decimal(variant.price);
        serverTotal = serverTotal.add(unitPrice.mul(item.quantity));

        orderItemsToCreate.push({
          productId: item.id,
          quantity: item.quantity,
          price: unitPrice,
          size: item.size,
        });

        await tx.productVariant.update({
          where: { id: variant.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const deliveryFee = calculateShippingFee(orderData.governorate);
      const finalTotal = serverTotal.add(deliveryFee);

      const initialStatus = (
        orderData.paymentMethod === "CARD" ? "AWAITING_PAYMENT" : "PENDING"
      ) as OrderStatusType;

      const orderCreationData: any = {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        governorate: orderData.governorate,
        address: orderData.address,
        shippingFee: deliveryFee,
        totalAmount: finalTotal,
        paymentMethod: orderData.paymentMethod || "COD",
        status: initialStatus,
        items: { create: orderItemsToCreate },
      };

      if (userId) {
        orderCreationData.userId = userId;
      }

      const newOrder = await tx.order.create({
        data: orderCreationData,
      });

      if (userId) {
        await tx.cartItem.deleteMany({ where: { userId } });
      }

      return newOrder;
    });

    revalidatePath("/orders");

    return { success: true, orderId: result.id };
  } catch (error) {
    console.error("createOrder error:", error);
    return {
      success: false,
      message: toPublicMessage(
        error,
        "Failed to place your order. Please try again."
      ),
    };
  }
}

export async function getUserOrders() {
  try {
    const user = await requireUser();
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              },
            },
          },
        },
      },
    });
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      date: order.createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: order.status,
      payment: order.paymentMethod,
      total: toNumber(order.totalAmount),
      shippingFee: toNumber(order.shippingFee),
      governorate: order.governorate,
      items: order.items.map((item) => ({
        id: item.productId,
        name: item.product.name,
        image: item.product.images[0] || "",
        size: item.size,
        quantity: item.quantity,
        price: toNumber(item.price),
      })),
    }));

    return { success: true, orders: formattedOrders };
  } catch (error) {
    console.error("getUserOrders error:", error);
    return {
      success: false,
      message: toPublicMessage(error, "Could not load your orders."),
    };
  }
}

export async function getAllOrders() {
  try {
    await requireAdmin();

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: {
          include: {
            product: {
              select: { name: true, images: true },
            },
          },
        },
      },
    });

    const serialized = orders.map((order) => ({
      ...order,
      totalAmount: toNumber(order.totalAmount),
      shippingFee: toNumber(order.shippingFee),
      items: (order.items ?? []).map((item) => ({
        ...item,
        price: toNumber(item.price),
      })),
    }));

    return { success: true, orders: serialized };
  } catch (error) {
    console.error("getAllOrders error:", error);
    return {
      success: false,
      message: toPublicMessage(error, "Failed to fetch orders"),
    };
  }
}

export async function updateOrderStatus(
  orderId: number,
  newStatus: OrderStatusType
) {
  try {
    await requireAdmin();

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!existingOrder) {
      return { success: false, message: "Order not found" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      if (newStatus === "CANCELLED" && existingOrder.status !== "CANCELLED") {
        for (const item of existingOrder.items) {
          const variant = await tx.productVariant.findFirst({
            where: { productId: item.productId, volume: item.size },
          });

          if (variant) {
            await tx.productVariant.update({
              where: { id: variant.id },
              data: { stock: { increment: item.quantity } },
            });
          }
        }
      }
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return {
      success: false,
      message: toPublicMessage(error, "Update failed"),
    };
  }
}
