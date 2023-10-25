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
      {" "}
      <div className="flex items-center justify-between h-16 py-3 bg-[#000080] border-b border-border-base top-bar lg:h-auto mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
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
          className="inline-block focus:outline-none text-white font-bold text-2xl max-w-[131px] w-full logo -mt-1.5 md:-mt-1 md:mx-auto ltr:pl-3 rtl:pr-3 md:ltr:pl-0 md:rtl:pr-0 lg:mx-0"
        >
          B2BeTrade
        </a>

        <div className="w-full transition-all duration-200 ease-in-out hidden lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:mx-8">
          <div className="overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 p ltr:left-0 rtl:right-0 transition-all duration-300 fixed"></div>
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
                    className="text-heading  p-6 bg-gray-100 outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 bg-fill-one"
                    placeholder="What are you looking..."
                    aria-label="top-bar-search"
                    autoComplete="off"
                    name="search"
                    value=""
                  />
                </label>
                <span className="absolute top-0 right-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none text-gray-500">
                  <SearchIcon sx={{ fontSize: 24 }} />
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
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#228B22]   "
                >
                  Post a Request
                </button>
              </div>
            </div>
            <button
              className="flex items-center justify-center shrink-0 h-auto focus:outline-none transform hidden lg:flex xl:mx-3.5 mx-2.5"
              aria-label="cart-button"
            >
              <span className="text-lg font-normal text-white lg:text-15px text-brand-dark ltr:ml-2 rtl:mr-2">
                Store
              </span>
            </button>
            <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
              <button
                className="text-sm font-normal text-white lg:text-15px text-brand-dark focus:outline-none ltr:ml-2 rtl:mr-2"
                aria-label="Authentication"
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 28 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Example categories={categories} subCategories={subCategories} />
    </div>
  );
};
