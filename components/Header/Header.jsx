"use client";
import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Usermenu from "./Usermenu";

import Example from "./Example";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
export const Header = ({ categories, subCategories }) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [quary, setQuary] = useState(search);
  const [isLogin, setLogin] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const handleUserMenuOpen = () => {
    setOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (quary.length > 1) {
      const currentSearchParams = new URLSearchParams(window.location.search);

      // Modify the search parameter
      currentSearchParams.set("search", quary);

      // Generate the new URL with the modified search parameter
      const newURL = `${
        window.location.pathname
      }?${currentSearchParams.toString()}`;

      // Use the `router.push` function to navigate to the new URL
      router.push(newURL, undefined, { shallow: true });
    } else {
      router.push("/browse", { shallow: true });
    }
  };

  const handleUserMenuClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <header className="bg-white ">
        <div className="max-w-9xl mx-auto  px-2 sm:px-4  lg:px-8">
          <div className="relative   h-16 flex justify-between items-center">
            <div className="relative z-10 px-2 flex lg:px-0 items-center">
              <div className=" z-40   lg:relative lg:z-10    flex items-center">
                <div className=" hidden     transition-all duration-100 ease-in-out lg:flex  ">
                  <div className="relative flex items-center text-md font-medium    py-0    hover:text-black">
                    Deals Today
                    <span className=" text-red-500">
                      <BoltOutlinedIcon />
                    </span>
                  </div>
                  <div className="relative flex items-center text-md font-medium  ml-8    py-0 t   hover:text-black">
                    #Offers
                  </div>
                  <div className="relative flex items-center text-md font-medium ml-8 py-0 text-red-500 ">
                    Under ৳ 500
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center ">
              <Link
                href={"/"}
                className="text-gray-900  font-bold uppercase text-2xl lg:text-3xl"
              >
                sudzar
              </Link>
            </div>
            <div className=" z-40   lg:relative lg:z-10 lg:ml-4  flex items-center">
              <div className=" hidden     transition-all duration-100 ease-in-out lg:flex  ">
                <div className="relative hidden mr-8  z-0 flex-1 px-2 md:flex items-center justify-center  ml">
                  <form
                    onSubmit={(e) => handleSearch(e)}
                    className="w-full sm:max-w-xs border flex items-center"
                  >
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        id="search"
                        name="search"
                        className="block w-full  bg-gray-100    rounded-md py-3 h-10  p-4 text-sm placeholder-gray-900 focus:outline-none focus:text-gray-900 focus:placeholder-gray-900   sm:text-sm"
                        placeholder="Search"
                        onChange={(e) => setQuary(e.target.value)}
                        type="search"
                      />
                    </div>
                    <button
                      type="submit"
                      className=" h-10  bg-gray-950  w-10 justify-center  flex items-center"
                    >
                      <SearchIcon className="  text-white" />
                    </button>
                  </form>
                </div>
              </div>
              {/* <button
                type="button"
                className=" flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <SearchIcon
                  sx={{ fontSize: "24px" }}
                  className=" text-gray-500"
                />
              </button> */}
              <button
                type="button"
                className=" flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FavoriteBorderOutlinedIcon
                  sx={{ fontSize: "24px" }}
                  className=" text-gray-500"
                />
              </button>
              <Link
                href={"/cart"}
                type="button"
                className="flex-shrink-0 bg-white rounded-full ml-4 text-gray-400 hover:text-gray-500 "
              >
                <ShoppingBagOutlinedIcon
                  sx={{ fontSize: "24px" }}
                  className=" text-gray-500"
                />
              </Link>
              <Link
                href={"/cart"}
                type="button"
                className="flex-shrink-0 hidden bg-white rounded-full ml-4 text-gray-400 hover:text-gray-500 "
              >
                <HeadsetMicOutlinedIcon
                  sx={{ fontSize: "24px" }}
                  className=" text-gray-500"
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
                    <AccountCircleOutlinedIcon
                      sx={{ fontSize: "24px" }}
                      className=" text-gray-500"
                    />
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
          <Example categories={categories} subCategories={subCategories} />
        </div>
        {/* 
        <nav className=" " aria-label="Global">
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
        </nav> */}
      </header>
    </div>
  );
};
