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
    // <div>
    //   {session.status == "authenticated" ? (
    //     <div
    //       className="origin-top-right z-50 absolute right-0     w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
    //       role="menu"
    //       aria-orientation="vertical"
    //       aria-labelledby="user-menu-button"
    //       tabIndex="-1"
    //     >
    //       {session.data.user.role === "admin" && (
    //         <Link
    //           href="/admin/dashboard"
    //           className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //           role="menuitem"
    //           tabIndex="-1"
    //           id="user-menu-item-0"
    //         >
    //           Admin
    //         </Link>
    //       )}

    //       {session.data.user.role === "vendor" && (
    //         <Link
    //           href="/vendor"
    //           className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //           role="menuitem"
    //           tabIndex="-1"
    //           id="user-menu-item-1"
    //         >
    //           Vendor
    //         </Link>
    //       )}

    //       {session.data.user.role === "user" && (
    //         <Link
    //           href="/profile"
    //           className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //           role="menuitem"
    //           tabIndex="-1"
    //           id="user-menu-item-2"
    //         >
    //           Profile
    //         </Link>
    //       )}

    //       {session.data.user.role === "supplier" && (
    //         <Link
    //           href="/supplier/dashboard"
    //           className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //           role="menuitem"
    //           tabIndex="-1"
    //           id="user-menu-item-2"
    //         >
    //           Dashboard
    //         </Link>
    //       )}

    //       <a
    //         href="#"
    //         className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //         role="menuitem"
    //         tabIndex="-1"
    //         id="user-menu-item-1"
    //       >
    //         Settings
    //       </a>

    //       <div
    //         className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //         role="menuitem"
    //         tabIndex="-1"
    //         id="user-menu-item-2"
    //         onClick={() => {
    //           signOut();
    //         }}
    //       >
    //         Sign out
    //       </div>
    //     </div>
    //   ) : (
    //     <div
    //       className="origin-top-right absolute right-0  -mt-1  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
    //       role="menu"
    //       aria-orientation="vertical"
    //       aria-labelledby="user-menu-button"
    //       tabIndex="-1"
    //     >
    //       <div
    //         className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#2B39D1] hover:text-white"
    //         role="menuitem"
    //         tabIndex="-1"
    //         id="user-menu-item-0"
    //         onClick={() => {
    //           signIn();
    //         }}
    //       >
    //         Sign in/ Register
    //       </div>

    //       <a
    //         href="#"
    //         className="block hover:bg-[#2B39D1] hover:text-white py-2 px-4 text-sm text-gray-700"
    //         role="menuitem"
    //         tabIndex="-1"
    //         id="user-menu-item-1"
    //       >
    //         Help
    //       </a>
    //     </div>
    //   )}
    // </div>

    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full ">
          <span className="sr-only">Open user menu</span>
          {session?.status === "authenticated" ? (
            <img
              className="h-8 w-8 rounded-full"
              src={session?.data.user.image}
              alt=""
            />
          ) : (
            <AccountCircleOutlinedIcon
              sx={{ fontSize: "28px" }}
              className="text-gray-950"
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
