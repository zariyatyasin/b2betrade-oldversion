"use client";
import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { usePathname } from "next/navigation";

export default function GobackPage() {
  const pathname = usePathname();
  const isHomePage = pathname === "/"; // Update this based on your home page route

  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      className={`text-white ${isHomePage ? "hidden" : "lg:hidden"}`}
      onClick={goBack}
    >
      <ArrowBackIosIcon sx={{ fontSize: 28 }} className=" text-gray-950 " />
    </div>
  );
}
