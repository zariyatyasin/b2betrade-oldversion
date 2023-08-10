"use client";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Usermenu from "./Usermenu";
import Example from "./Example";

import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
export const Header = () => {
  const session = useSession();

  const [isLogin, setLogin] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const handleUserMenuOpen = () => {
    setOpen(true);
  };

  const handleUserMenuClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <header className="bg-white  border-b">
        <div className="max-w-9xl mx-auto  px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
          <div className="relative   h-16 flex justify-between items-center">
            <div className="relative z-10 px-2 flex lg:px-0 items-center">
              <div className="flex-shrink-0 flex items-center ">
                <span className="text-gray-900 font-semibold text-2xl lg:text-3xl">
                  sudzar
                </span>
              </div>

              <div className=" hidden     transition-all duration-100 ease-in-out lg:flex  ">
                <div className="relative flex items-center text-md font-medium  ml-16    py-0    hover:text-black">
                  Deals Today
                  <span className=" text-red-500">
                    <BoltOutlinedIcon />
                  </span>
                </div>
                <div className="relative flex items-center text-md font-medium  ml-8    py-0 t   hover:text-black">
                  Offers
                </div>
                <div className="relative flex items-center text-md font-medium  ml-8    py-0 t   hover:text-black">
                  FAQ
                </div>
                <div className="relative hidden ml-16  z-0 flex-1 px-2 md:flex items-center justify-center  ">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5 text-gray-900" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full  bg-gray-100    rounded-md py-3 pl-10 pr-8 text-sm placeholder-gray-900 focus:outline-none focus:text-gray-900 focus:placeholder-gray-900   sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center lg:hidden">
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              ></button>
            </div>
            <div className="  lg:hidden  ">
              <MenuOutlinedIcon />
            </div>
            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
              <button
                type="button"
                className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FavoriteBorderOutlinedIcon
                  sx={{ fontSize: "27px" }}
                  className=" text-gray-900"
                />
              </button>
              <Link
                href={"/cart"}
                type="button"
                className="flex-shrink-0 bg-white rounded-full ml-4 text-gray-400 hover:text-gray-500 "
              >
                <ShoppingBagOutlinedIcon
                  sx={{ fontSize: "27px" }}
                  className=" text-gray-900"
                />
              </Link>

              <div
                className="  relative ml-4 cursor-pointer  "
                onMouseEnter={handleUserMenuOpen}
                onMouseLeave={handleUserMenuClose}
              >
                {session.status == "authenticated" ? (
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                ) : (
                  <div>
                    <AccountCircleOutlinedIcon sx={{ fontSize: "27px" }} />
                  </div>
                )}
                {isOpen && (
                  <Usermenu
                    session={session}
                    isLogin={isLogin}
                    onMouseEnter={handleUserMenuOpen}
                    onMouseLeave={handleUserMenuClose}
                  />
                )}
              </div>
            </div>
          </div>
          <nav className="   " aria-label="Global">
            <Example />
          </nav>
        </div>

        <nav className="hidden" aria-label="Global" id="mobile-menu">
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="px-4 flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  Tom Cook
                </div>
                <div className="text-sm font-medium text-gray-500">
                  tom@example.com
                </div>
              </div>
              <button
                type="button"
                className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <NotificationsOutlinedIcon
                  sx={{ fontSize: "24px" }}
                  className=""
                />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Your Profile
              </a>

              <a
                href="#"
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Settings
              </a>

              <a
                href="#"
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Sign out
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
