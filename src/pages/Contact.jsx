import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-3xl font-semibold mb-4 prata-regular text-gold-base ">
          Contact Us
        </h1>
        <p className="text-gray-600 leading-relaxed">
          We're here to help. Reach out to us anytime and we’ll happily answer
          your questions.
        </p>
      </div>

      {/* GRID: FORM + INFO */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* CONTACT FORM */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your name" className="inputStyle" />

            <input
              type="email"
              placeholder="Your email"
              className="inputStyle"
            />

            <textarea
              placeholder="Your message"
              className="inputStyle h-32 resize-none"
            ></textarea>

            <button className="py-3 mt-2 bg-black text-white rounded-xl hover:bg-gold-base hover:text-black transition">
              Send Message
            </button>
          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="space-y-10">
          {/* PHONE */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+20 0111 684 5684</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">support@yourbrand.com</p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-600">Cairo, Egypt</p>
            </div>
          </div>

          {/* MAP IMAGE */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-64">
            <a href="https://maps.app.goo.gl/99oThPfMUFaUUjLF6">
              <img
                src={assets.Location}
                alt="Map"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
