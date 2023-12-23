"use client";
import React from "react";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { signOut } from "next-auth/react";
export default function Signout() {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div
      className="flex justify-center items-center flex-col mb-4 sm:mb-0 cursor-pointer lg:hidden"
      onClick={handleSignOut}
    >
      <ExitToAppOutlinedIcon sx={{ fontSize: 28 }} />
      <p className="text-sm mt-2 text-gray-500">Signout</p>
    </div>
  );
}
