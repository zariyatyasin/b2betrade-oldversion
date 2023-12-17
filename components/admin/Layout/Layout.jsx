"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import { Navbar } from "./sidebar/Navbar";

const Layout = ({ children }) => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;

  const dispatch = useDispatch();

  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      {/* <div
        className={` ${
          expand ? "fixed inset-0 bg-black opacity-50 z-10" : " hidden"
        }    `}
        onClick={() => dispatch(toggleSidebar(!expand))}
      ></div> */}
      <div
        className={`pt-24 transition-all ease-in-out duration-300 bg-gray-100  w-full  overflow-hidden ${
          expand ? "md:ml-64" : "ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
