"use client";
import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/navigation";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { signIn, useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Navigation } from "../../data/Navigation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MobileCategory from "./MobileCategory";
import { useSelector } from "react-redux";
import Link from "next/link";
function MobileMenu({ categories, subCategories }) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024"));
  const { cart } = useSelector((state) => ({ ...state }));
  const { data: session, status } = useSession();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === "profile") {
      if (!session) {
        signIn();
      } else {
        if (session?.user.role === "admin") {
          router.push("/admin/dashboard");
        }
        if (session?.user.role === "supplier") {
          router.push("/supplier/dashboard");
        }
        if (session?.user.role === "user") {
          router.push("/profile");
        }
      }
    }
    if (newValue === "cart") {
      // Navigate to the profile page
      router.push("/cart");
    }
    if (newValue === "home") {
      // Navigate to the profile page
      router.push("/");
    }
    if (newValue === "category") {
      setOpen(!open);
    }
    if (newValue === "category" && !open) {
      setValue("");
    }
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <CloseOutlinedIcon />
                </button>
              </div>

              {categories.map((category, i) => (
                <MobileCategory
                  key={i}
                  category={category}
                  subCategories={subCategories}
                />
              ))}

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link
                    href="/list?storeType=supplier"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: "18px", marginRight: 1 }}
                    />
                    <span> Supplier</span>
                  </Link>
                  <Link
                    href="/list?storeType=manufacturerlist"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    <FactoryOutlinedIcon
                      sx={{ fontSize: "18px", marginRight: 1 }}
                    />
                    <span> Manufacturer</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link
                    href="/signin"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Sign in/ Register
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link
                    href="/b2betrade/form/supplier"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Become a Supplier
                  </Link>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {isMobile && (
        <BottomNavigation
          className="fixed bottom-0 left-0 right-0 border bg-white"
          sx={{ zIndex: 10 }}
          value={value}
          showLabels
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Category"
            value="category"
            icon={<CategoryOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Cart"
            value="cart"
            icon={
              <div style={{ position: "relative" }}>
                <ShoppingCartOutlinedIcon />
                {cart.cartItems.length > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#2B39D1] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {cart.cartItems.length}
                  </div>
                )}
              </div>
            }
          />
          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={
              session ? (
                <img
                  className="h-5 w-5 rounded-full"
                  src={session?.user?.image}
                  alt=""
                />
              ) : (
                <AccountCircleOutlinedIcon />
              )
            }
          />
        </BottomNavigation>
      )}
    </div>
  );
}

export default MobileMenu;
