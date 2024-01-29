import React from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Usermenu = ({ isLogin, session }) => {
  return (
    <Menu as="div" className="lg:ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs  flex items-center text-sm rounded-full ">
          <span className="sr-only">Open user menu</span>
          {session?.status === "authenticated" ? (
            <img
              className="h-8 w-8 rounded-full"
              src={session?.data.user.image}
              alt=""
            />
          ) : (
            <AccountCircleOutlinedIcon
              sx={{ fontSize: [24, 28] }}
              className=" text-[#2B39D1] lg:text-white"
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white">
          {session?.status === "authenticated" ? (
            <>
              {session?.data.user.role === "admin" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/admin/dashboard"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Admin
                    </Link>
                  )}
                </Menu.Item>
              )}

              {session?.data.user.role === "user" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
              )}

              {session?.data.user.role === "supplier" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/supplier/dashboard"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
                    )}
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/signin" // Update with your sign in page
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Sign In/Register
                </Link>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Usermenu;
