"use client";

import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function FloatingWhatsapp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+8801841480230";
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    window.open(whatsappLink, "_blank");
  };
  return (
    <div
      className="  fixed right-4 bottom-2  bg-white lg:bg-[#2B39D1] rounded-full p-4 z-40 overflow-hidden  border shadow-md cursor-pointer items-center flex-col mb-4 sm:mb-0"
      onClick={handleWhatsAppClick}
    >
      <div className=" flex flex-col  relative   items-center justify-center">
        <WhatsAppIcon
          sx={{ fontSize: 28 }}
          className=" text-[#25D366] lg:text-white"
        />
        {/* <p className="text-sm mt-2 text-gray-500 flex items-center ">
          Live Chat{" "}
          <div className=" ml-1  relative flex h-3 w-3 ">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
          </div>
        </p> */}
      </div>
    </div>
  );
}
