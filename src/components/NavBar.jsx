import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, ArrowLeft } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [isOpen, SetIsOpen] = useState(false); // sidebar
  const [open, setOpen] = useState(false); // user menu

  const { setSearchOpen, getCartCount } = useContext(ShopContext);

  const userRef = useRef(null);
  const sideRef = useRef(null);

  /** ---------------- CLOSE ON OUTSIDE CLICK ---------------- **/
  useEffect(() => {
    const handleClick = (e) => {
      // close user menu
      if (open && userRef.current && !userRef.current.contains(e.target)) {
        setOpen(false);
      }

      // close sidebar
      if (isOpen && sideRef.current && !sideRef.current.contains(e.target)) {
        SetIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, isOpen]);

  return (
    <div className="flex items-center justify-between py-5 font-medium sticky top-0 z-50 bg-white ">
      <Link to={"/"}>
        <span className="text-3xl text-gold-base prata-regular">ROSE MISK</span>
      </Link>

      {/* DESKTOP MENU */}
      <ul className="hidden sm:flex gap-5 text-sm text-black">
        <NavLink to={"/"} className="flex flex-col gap-1 items-center">
          <p>HOME</p>
        </NavLink>
        <NavLink
          to={"/fragrances"}
          className="flex flex-col gap-1 items-center"
        >
          <p>FRAGRANCES</p>
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col gap-1 items-center">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col gap-1 items-center">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-6">
        <Search
          className="w-5 cursor-pointer"
          onClick={() => setSearchOpen((prev) => !prev)}
        />

        {/* USER MENU */}
        <div className="relative" ref={userRef}>
          <User
            className="w-5 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />

          {open && (
            <div className="absolute right-0 pt-3">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 shadow-lg rounded">
                <NavLink to={"/login"}>
                  <p className="hover:text-black cursor-pointer">My Profile</p>
                </NavLink>
                <NavLink to={"/orders"}>
                  <p className="hover:text-black cursor-pointer">Orders</p>
                </NavLink>
                <p className="hover:text-black cursor-pointer">Log Out</p>
              </div>
            </div>
          )}
        </div>

        {/* CART */}
        <Link to={"/cart"} className="relative">
          <ShoppingBag className="w-5 min-w-5 cursor-pointer" />
          <p className="text-white rounded-full absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-[8px] ">
            {getCartCount}
          </p>
        </Link>

        {/* MOBILE MENU ICON */}
        <Menu
          className="cursor-pointer w-5 sm:hidden"
          onClick={() => SetIsOpen(true)}
        />
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        ref={sideRef}
        className={`fixed top-0 right-0 bottom-0 h-full overflow-auto bg-white transition-all duration-300 ${
          isOpen ? "w-full" : "w-0"
        } z-50`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => SetIsOpen(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <ArrowLeft className="h-4" />
            <p>Back</p>
          </div>
          <NavLink to={"/"} onClick={() => SetIsOpen(false)}>
            <p className="my-[15px] ml-[6px]">HOME</p>
          </NavLink>
          <NavLink to={"/fragrances"} onClick={() => SetIsOpen(false)}>
            <p className="my-[15px] ml-[6px]">FRAGRANCES</p>
          </NavLink>
          <NavLink to={"/about"} onClick={() => SetIsOpen(false)}>
            <p className="my-[15px] ml-[6px]">ABOUT</p>
          </NavLink>
          <NavLink to={"/contact"} onClick={() => SetIsOpen(false)}>
            <p className="my-[15px] ml-[6px]">CONTACT</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
