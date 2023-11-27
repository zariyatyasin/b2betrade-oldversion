"use client";

import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { categoriesAndSub } from "../../data/CategoriesAndSub";

import { Navigation } from "../../data/Navigation";
import Link from "next/link";
const solutions = [
  {
    name: "Become a Supplier",
    description:
      "Become a supplier and start providing products or services to our platform.",
    href: "/b2betrade/form/supplier",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    name: "Become a Seller",
    description:
      "Become a seller and start offering your products for sale on our platform.",
    href: "/b2betrade/form/Seller",
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    name: "Become a Manufacturer",
    description:
      "Become a seller and start offering your products for sale on our platform.",
    href: "/b2betrade/form/manufacturer",
    icon: <FactoryOutlinedIcon />,
  },
  {
    name: "Need Help?",
    description:
      "If you need assistance or have any questions, we're here to help.",
    href: "#",
    icon: <HeadsetMicOutlinedIcon />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ categories, subCategories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryListOpen, setCategoryListOpen] = useState(false);
  const [isSubCategoryListOpen, setSubCategoryListOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const leaveMouse = () => {
    setCategoryListOpen(false);
    setSelectedCategory(null);
  };
  return (
    <div className="bg-white hidden lg:block  ">
      <header className="relative bg-white text-gray-950">
        <nav aria-label="Top" className="  ">
          <div>
            <div
              className={`  flex items-center justify-between h-16   border-b border-border-base top-bar lg:h-auto mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10`}
            >
              <div className="  mr-5  lg:flex">
                <div
                  className="flex   hover:cursor-pointer  py-3 w-full items-center text-sm text-gray-950  relative"
                  onMouseEnter={() => setCategoryListOpen(true)}
                  onMouseLeave={leaveMouse}
                >
                  <MenuOutlinedIcon sx={{ fontSize: "18px" }} />
                  <div className="ml-2 font-bold ">All Categories</div>

                  <ul
                    className={`absolute  bg-white shadow-lg ring-1 ring-black ring-opacity-5  top-0 z-50 left-0 mt-9 px-2 w-screen max-w-xs sm:px-0 ${
                      isCategoryListOpen ? "visible" : "invisible"
                    }`}
                  >
                    {categories?.map((category) => (
                      <li
                        key={category.name}
                        className="flex relative items-center justify-between p-4 hover:bg-gray-50 transition ease-in-out duration-150"
                        onMouseEnter={() => setSelectedCategory(category._id)}
                      >
                        <div className="ml-4">
                          <p className="text-gray-900">{category.name}</p>
                        </div>
                        <div>
                          <ArrowForwardIosOutlinedIcon sx={{ fontSize: 14 }} />
                        </div>
                      </li>
                    ))}

                    <div
                      className={`absolute top-0   w-[672px] border bg-white left-80 grid  py-6 lg:grid-cols-3 ${
                        isCategoryListOpen ? "visible" : "invisible"
                      }`}
                      onMouseLeave={() => setSelectedCategory(null)}
                    >
                      {subCategories?.map(
                        (subCategory) =>
                          subCategory.parent._id === selectedCategory && (
                            <ul key={subCategory.name} className="pl-4  ">
                              <li className=" p-4">
                                <p className="text-gray-700 hover:font-bold">
                                  {subCategory.name}
                                </p>
                              </li>
                            </ul>
                          )
                      )}
                    </div>
                  </ul>
                </div>
              </div>
              <div className="hidden lg:flex  lg:items-center  mr-5 ">
                <Link
                  href="/browse/buyerrequest"
                  className="text-sm flex items-center f text-gray-950 mr-2 hover:text-gray-800"
                >
                  <span> Browse Project</span>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end  ">
                  <a
                    href="#"
                    className="text-sm flex items-center f text-gray-950 mr-2 hover:text-gray-800"
                  >
                    <FactoryOutlinedIcon
                      sx={{ fontSize: "18px", marginRight: 1 }}
                    />
                    <span> Manufacturer</span>
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a
                    href="#"
                    className="text-sm flex items-center f text-gray-950 ml-2 hover:text-gray-800"
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: "18px", marginRight: 1 }}
                    />
                    <span> Supplier</span>
                  </a>
                </div>

                <div className="hidden ml-5  lg:flex">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-gray-900" : "text-gray-500",
                            "group bg-white rounded-md inline-flex items-centere   text-sm  text-gray-950  "
                          )}
                        >
                          <span>Become a Supplier</span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-50 left-[-50%] transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {solutions.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    {item.icon}
                                    <div className="ml-4">
                                      <p className="text-base f text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
