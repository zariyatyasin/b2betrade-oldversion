"use client";

import Link from "next/link";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { signOut } from "next-auth/react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { toggleSidebar } from "../../../../store/ExpandSlice";
import { usePathname } from "next/navigation";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Sidebar = () => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const pathname = usePathname();
  const router = pathname.split("/admin/dashboard/")[1];
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-0 left-0 z-50 transition-all border ease-in-out duration-300 bg-white h-screen w-64 ${
        expand ? "" : "-translate-x-full"
      }`}
    >
      <div
        className={`text-black  hidden    absolute right-[-20px] text-3xl top-[57px] z-50    cursor-pointer ${
          !expand && "rotate-180"
        }`}
        onClick={() => dispatch(toggleSidebar(true))}
      >
        X
      </div>

      <div className="flex-shrink-0 flex border-b  border-gray-200 ml-4">
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center h-16">
            <div>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                Tom Cook
              </p>
              <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                View profile
              </p>
            </div>
          </div>
        </a>
      </div>
      <div
        className={`  transition-all ease-in-out duration-300  top-0 left-0 h-screen `}
      >
        <div className={`  `}>
          <div className="overflow-y-auto overflow-x-hidden flex-grow relative">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="mb-2 text-sm font-semibold  tracking-tight">
                    Menu
                  </div>
                </div>
              </li>
              <li className="px-2">
                <Link
                  href={"/admin/dashboard"}
                  className={` ${
                    router == undefined ? "bg-gray-950 text-white" : ""
                  } inline-flex items-center rounded-md  text- um hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <span className="inline-flex justify-center items-center ">
                    <HomeOutlinedIcon sx={{ fontSize: 18 }} />
                  </span>
                  <span className="ml-1 text-sm  font-medium">Dashboard</span>
                </Link>
              </li>

              <li className="px-2">
                <Link
                  href="/admin/dashboard/sales"
                  className={` ${
                    router == "sales" ? "bg-gray-950 text-white" : ""
                  }  inline-flex items-center rounded-md  text-s m hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <span className="inline-flex justify-center items-center ">
                    <MonetizationOnOutlinedIcon sx={{ fontSize: 18 }} />
                  </span>
                  <span className="ml-1 text-sm  font-medium">Sales</span>
                </Link>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/order"
                  className={`  ${
                    router == "order" ? "bg-gray-950 text-white" : ""
                  }  inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <DvrOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">Order</span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span>
                </Link>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/user"
                  className={` ${
                    router == "user" ? "bg-gray-950 text-white" : ""
                  }  inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <AccountCircleOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">User</span>
                </Link>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/message"
                  className={`  ${
                    router == "message" ? "bg-gray-950 text-white" : ""
                  }  inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <MailOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">Message</span>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="mb-2 text-sm font-semibold  tracking-tight">
                    Product
                  </div>
                </div>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/product/allproduct"
                  className={`  ${
                    router == "allproduct" ? "bg-gray-950 text-white" : ""
                  } inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">All Product</span>
                </Link>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/product/createproduct"
                  className={`  ${
                    router == "createproduct" ? "bg-gray-950 text-white" : ""
                  } inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <ShoppingBasketOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">
                    Create Product
                  </span>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="mb-2 text-sm font-semibold  tracking-tight">
                    Categories / Subs
                  </div>
                </div>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/categories"
                  className={`  ${
                    router == "categories" ? "bg-gray-950 text-white" : ""
                  }  inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <CategoryOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">Categories</span>
                </Link>
              </li>
              <li className="px-2">
                <Link
                  href="/admin/dashboard/subcategories"
                  className={`  ${
                    router == "subcategories" ? "bg-gray-950 text-white" : ""
                  }  inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <AppRegistrationOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">
                    Subcategories
                  </span>
                </Link>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="mb-2 text-sm font-semibold  tracking-tight">
                    Coupons
                  </div>
                </div>
              </li>

              <li className="px-2">
                <Link
                  href="/admin/dashboard/coupon"
                  className={`inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <LocalAtmOutlinedIcon sx={{ fontSize: 18 }} />
                  <span className="ml-1 text-sm  font-medium">Coupons</span>
                </Link>
              </li>
              <li className="px-2">
                <a
                  href="#"
                  className={`inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <span className="inline-flex justify-center items-center ">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-1 text-sm  font-medium">Settings</span>
                </a>
              </li>
              <li onClick={() => signOut()}>
                <a
                  href="#"
                  className={`inline-flex items-center rounded-md  text-sm  hover:bg-gray-950 hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-8`}
                >
                  <span className="inline-flex justify-center items-center ">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  <button className="ml-1 text-sm  font-medium">Logout</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
