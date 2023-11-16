"use client";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { sidebarData } from "../../../data/ProfileData";
import SideBarItem from "./SideBarItems";

const navigation = [
  { name: "Overview", href: "#", icon: "HomeIcon", current: true },
  { name: "Team", href: "#", icon: "HomeIcon", current: false },
  { name: "Projects", href: "#", icon: "HomeIcon", current: false },
  { name: "Calendar", href: "#", icon: "HomeIcon", current: false },
  { name: "Documents", href: "#", icon: "HomeIcon", current: false },
  { name: "Reports", href: "#", icon: "HomeIcon", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Layout = ({ children, data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className=" max-w-7xl mx-auto  px-2 sm:px-4  lg:px-8">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>x
                  </button>
                </div>
              </Transition.Child>

              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden mt-20 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-20  ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="  border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
          <div className="flex-grow mt-5 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {sidebarData.map((item, i) => (
                <SideBarItem
                  kye={i}
                  item={item}
                  visible={data.tab == i.toString()}
                  index={i.toString()}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64    pt-8">
        <div className="max-w-6xl mx-auto flex flex-col md:px-8 xl:px-0">
          {/* <div className="sticky top-0  flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>=
            </button>
            top
          </div> */}

          <main className="   flex-1 ml-">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
