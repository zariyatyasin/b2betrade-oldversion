"use client";
import React from "react";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import { signOut } from "next-auth/react";
export default function FirstSection({ name }) {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+8801841480230";
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    window.open(whatsappLink, "_blank");
  };
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="py-10 px-4 bg-white flex-1">
        <div className=" w-full justify-between flex items-center mb-4">
          <h5 className="font-semibold text-gray-950 text-xl">Hi, {name}</h5>
          <Link href={`profile/edit`} className=" flex  items-center">
            <div className=" text-xs text-blue-600 mr-2">Edit</div>{" "}
            <ModeEditOutlinedIcon sx={{ fontSize: 18 }} />
          </Link>
        </div>

        <div className="flex  flex-row flex-wrap gap-4 justify-between mt-8">
          <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
            <FavoriteBorderIcon sx={{ fontSize: 28 }} />
            <p className="text-sm mt-2 text-gray-500">Wish List</p>
          </div>
          <Link
            href={`/profile/orders?tab=1&q=all-orders__`}
            className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
          >
            <TakeoutDiningOutlinedIcon sx={{ fontSize: 28 }} />
            <p className="text-sm mt-2 text-gray-500">Orders</p>
          </Link>
          <div
            className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
            onClick={handleWhatsAppClick}
          >
            <WhatsAppIcon sx={{ fontSize: 28 }} />
            <p className="text-sm mt-2 text-gray-500">Live Chat</p>
          </div>
          {/* <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
                <InventoryOutlinedIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Requested</p>
              </div> */}
          <Link
            href={"/contact"}
            className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
          >
            <HeadsetMicOutlinedIcon sx={{ fontSize: 28 }} />
            <p className="text-sm mt-2 text-gray-500">Help</p>
          </Link>
          {/* <Signout /> */}
        </div>
      </div>
      <div className="py-10 px-4 bg-white flex justify-between w-full md:w-96 ">
        <Link
          href={"/profile/address"}
          className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
        >
          <BusinessOutlinedIcon sx={{ fontSize: 28 }} />
          <p className="text-sm mt-2 text-gray-500">Address</p>
        </Link>
        {/* <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
          <SmsOutlinedIcon sx={{ fontSize: 28 }} />
          <p className="text-sm mt-2 text-gray-500">My Message</p>
        </div> */}

        <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
          <FeedbackOutlinedIcon sx={{ fontSize: 28 }} />
          <p className="text-sm mt-2 text-gray-500">FeedBack</p>
        </div>
        <div
          className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
          onClick={() => signOut()}
        >
          <LogoutIcon sx={{ fontSize: 28 }} />
          <p className="text-sm mt-2 text-gray-500">Sign Out</p>
        </div>
      </div>
    </div>
  );
}
