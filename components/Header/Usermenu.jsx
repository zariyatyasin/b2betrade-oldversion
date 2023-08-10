import React from "react";
import { signIn, signOut } from "next-auth/react";
const Usermenu = ({ isLogin, session }) => {
  return (
    <div>
      {session.status == "authenticated" ? (
        <div
          className="origin-top-right absolute right-0   -mt-1   w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
        >
          <a
            href="#"
            className="block py-2 px-4 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-0"
          >
            Your Profile
          </a>

          <a
            href="#"
            className="block py-2 px-4 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-1"
          >
            Settings
          </a>

          <div
            className="block py-2 px-4 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-2"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </div>
        </div>
      ) : (
        <div
          className="origin-top-right absolute right-0  -mt-1  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
        >
          <div
            className="block py-2 px-4 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-0"
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </div>

          <a
            href="#"
            className="block py-2 px-4 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-1"
          >
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
