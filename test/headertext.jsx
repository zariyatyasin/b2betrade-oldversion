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

    if (quary?.length > 1) {
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
      <header className="bg-white  ">
        <div className="max-w-9xl mx-auto  px-2 sm:px-4  lg:px-8 z-50">
          <div className="    h-16 flex justify-between items-center sticky top-0  flex-shrink-0  ">
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
                className="  relative ml-4 cursor-pointer  z-50"
                onMouseEnter={handleUserMenuOpen}
                onMouseLeave={handleUserMenuClose}
              >
                {session?.status == "authenticated" ? (
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
                        src={session?.data.user.image}
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
          {/* <Example categories={categories} subCategories={subCategories} /> */}
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

<div className="flex items-center justify-between h-16 py-3 border-b border-border-base top-bar lg:h-auto mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
  <div className="relative shrink-0 lg:hidden">
    <button className="border border-border-base rounded-md focus:outline-none text-sm lg:text-15px font-medium text-brand-dark px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center transition-all hover:border-border-four">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-xl lg:text-2xl"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      <span className="hidden md:inline-flex ltr:ml-2.5 rtl:mr-2.5">
        All Categories
      </span>
    </button>
  </div>
  <a
    href="/"
    className="inline-block focus:outline-none max-w-[131px] w-full logo -mt-1.5 md:-mt-1 md:mx-auto ltr:pl-3 rtl:pr-3 md:ltr:pl-0 md:rtl:pr-0 lg:mx-0"
  >
    {/* <img
        alt="BoroBazar"
        loading="eager"
        width="131"
        height="30"
        decoding="async"
        data-nimg="1"
        style={{ color: "transparent" }}
        src="/_next/static/media/logo.026129ac.svg"
      /> */}
    B2BeTrade
  </a>
  <div className="w-full transition-all duration-200 ease-in-out hidden lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:mx-8">
    <div className="overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed"></div>
    <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
      <div className="flex flex-col w-full mx-auto">
        <form
          className="relative flex w-full rounded-md"
          noValidate=""
          role="search"
        >
          <label
            htmlFor="top-bar-search"
            className="flex flex-1 items-center py-0.5"
          >
            <input
              id="top-bar-search"
              className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 bg-fill-one"
              placeholder="What are you looking..."
              aria-label="top-bar-search"
              autoComplete="off"
              name="search"
              value=""
            />
          </label>
          <span className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none">
            {" "}
          </span>
        </form>
      </div>
    </div>
  </div>
  <div className="ltr:ml-auto rtl:mr-auto md:ltr:ml-0 md:rtl:mr-0">
    <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
      <div className="xl:mx-3.5 mx-2.5">
        <div className="relative z-10 lg:top-[1px]">
          <button
            className="relative w-full py-2 rounded-lg cursor-pointer text-brand-dark ltr:pl-3 rtl:pr-3 ltr:pr-5 rtl:pl-5 ltr:text-left rtl:text-right focus:outline-none"
            id="headlessui-listbox-button-:Rpi96:"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            data-headlessui-state=""
          >
            <span className="flex items-center text-sm truncate lg:text-15px">
              <span className="w-5 h-5 overflow-hidden rounded-full ltr:mr-2 rtl:ml-2 shrink-0">
                {" "}
              </span>
              <span className="leading-5 pb-0.5">English - EN</span>
            </span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none ltr:right-0 rtl:left-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-3 h-3.5 text-brand-dark opacity-40"
                aria-hidden="true"
              >
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <button
        className="flex items-center justify-center shrink-0 h-auto focus:outline-none transform hidden lg:flex xl:mx-3.5 mx-2.5"
        aria-label="cart-button"
      >
        <div className="relative flex items-center">
          <span className="min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-brand text-brand-light absolute -top-2.5 ltr:left-2.5 rtl:right-2.5 text-10px font-bold">
            0
          </span>
        </div>
        <span className="text-sm font-normal lg:text-15px text-brand-dark ltr:ml-2 rtl:mr-2">
          Cart
        </span>
      </button>
      <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
        <button
          className="text-sm font-normal lg:text-15px text-brand-dark focus:outline-none ltr:ml-2 rtl:mr-2"
          aria-label="Authentication"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</div>;
