"use client";
import React, { useEffect, useRef } from "react";

import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MobileCategory from "./MobileCategory";

import SearchIcon from "@mui/icons-material/Search";
import Usermenu from "./Usermenu";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { Listbox } from "@headlessui/react";
import Example from "./Example";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import MobileSearchModel from "../../components/search/MobileSearchModel";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import GobackPage from "../../components/gobackPage/GobackPage";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useSelector } from "react-redux";

const publishingOptions = [
  // {
  //   title: "B2B+B2C",
  //   description: "Tailored for business-to-business interactions.",
  //   current: true,
  // },
  {
    title: "B2B",
    description: "Tailored for business-to-business interactions.",
    current: true,
  },
  // {
  //   title: "B2C",
  //   description: "Designed for business-to-consumer interactions.",
  //   current: false,
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = ({ categories, subCategories }) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [query, setQuery] = useState(search);
  const [isLogin, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(publishingOptions[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  const { cart } = useSelector((state) => ({ ...state }));
  const suggestionListRef = useRef();
  const isHomePage = pathname === "/";
  // Add this code inside your component
  useEffect(() => {
    const searchParam = searchParams.get("productType");
    if (searchParam) {
      const selectedOption = publishingOptions.find(
        (option) => option.title === searchParam
      );
      if (selectedOption) {
        setSelected(selectedOption);
      }
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`/api/search/${query}`);
        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (query?.length > 1) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (
      suggestionListRef.current &&
      !suggestionListRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };
  const handleSelectionChange = (option) => {
    setSelected(option);
    if (option.title) {
      if (option.title === publishingOptions[0].title) {
        router.push(`?productType= `);
      } else {
        router.push(`?productType=${option.title}`);
      }
    }
  };
  const handleInputFocus = () => {
    setModalOpen(true);
  };

  const highlightMatchedText = (text, query) => {
    if (!query) return <span>{text}</span>;

    const regex = new RegExp(`(${query})`, "ig");

    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="text-gray-950 font-bold">
              {part}
            </span>
          ) : (
            <span className=" text-gray-600" key={index}>
              {part}
            </span>
          )
        )}
      </span>
    );
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (query?.length > 1) {
      const currentSearchParams = new URLSearchParams(window.location.search);

      router.push(`/browse?search=${query}`);
    } else {
      router.push("/browse", { shallow: true });
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-50 lg:hidden"
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
            <div className="relative   max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <CloseOutlinedIcon />
                </button>
              </div>

              {categories?.map((category, i) => (
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
                  {session?.status === "authenticated" ? (
                    <div>
                      <div
                        onClick={() => signOut()}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        Sign out
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => signIn()}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Sign in/ Register
                    </div>
                  )}
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
      <div className="  file: bg-[#2B39D1]  fixed w-full  z-40 top-0 ">
        <div className="flex items-center justify-between py-3 lg:py-4    lg:border-b border-border-base top-bar lg:h-auto mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 2xl:px-10">
          <div className="flex items-center">
            <GobackPage />
            <div
              onClick={() => setOpen(true)}
              className={` text-white ${
                isHomePage ? "flex" : "hidden"
              } lg:hidden`}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </div>
            <Link
              href="/"
              className="inline-block focus:outline-none  text-white font-bold text-xl md:text-3xl max-w-[131px] "
            >
              B2B
              <span className="  text-[#FFD700] text-xl md:text-3xl">
                eTrade
              </span>
            </Link>
          </div>

          <div className="w-full transition-all duration-200 ease-in-out hidden lg:flex   relative lg:max-w-[650px] 2xl:max-w-[800px] lg:mx-8">
            <div className="relative z-30 flex flex-col justify-center w-full shrink-0  ">
              <div className="flex flex-col w-full mx-auto  justify-center relative  ">
                <form
                  className="relative flex w-full rounded-md"
                  noValidate=""
                  role="search"
                  onSubmit={(e) => handleSearch(e)}
                >
                  <label
                    htmlFor="top-bar-search"
                    className="flex flex-1 items-center py-0.5 relative"
                  >
                    {/* <Listbox value={selected} onChange={handleSelectionChange}>
                      {({ open }) => (
                        <div className="">
                          <div className="relative ">
                            <div className="inline-flex h-11 shadow-sm rounded-md   ">
                              <div className="relative z-0 inline-flex shadow-sm rounded-md   ">
                                <div className="relative inline-flex items-center   bg-[#FFD700] py-3 pl-3     rounded-l-md shadow-sm text-white">
                                  <p className="ml-2.5 text-sm font-medium">
                                    {selected.title}
                                  </p>
                                </div>
                                <Listbox.Button className="relative inline-flex items-center bg-[#FFD700] p-2 rounded-l-none   text-sm font-medium text-white ">
                                  <KeyboardArrowDownOutlinedIcon />
                                </Listbox.Button>
                              </div>
                            </div>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden text-gray-950 bg-white    ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {publishingOptions.map((option) => (
                                  <Listbox.Option
                                    key={option.title}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-[#FFD700] "
                                          : " text-gray-950",
                                        "cursor-default select-none relative p-4 text-sm"
                                      )
                                    }
                                    value={option}
                                  >
                                    {({ selected, active }) => (
                                      <div className="flex flex-col">
                                        <div className="flex justify-between">
                                          <p
                                            className={
                                              selected
                                                ? "font-semibold"
                                                : "font-normal"
                                            }
                                          >
                                            {option.title}
                                          </p>
                                          {selected ? (
                                            <span
                                              className={
                                                active
                                                  ? "text-white"
                                                  : "text-gray-900"
                                              }
                                            >
                                              <CheckOutlinedIcon />
                                            </span>
                                          ) : null}
                                        </div>
                                        <p className={classNames("mt-2")}>
                                          {option.description}
                                        </p>
                                      </div>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </div>
                      )}
                    </Listbox> */}

                    <input
                      id="top-bar-search"
                      className="text-heading bg-gray-100  p-4  rounded-full   outline-none w-full h-11 ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px    transition-all duration-200  placeholder:text-brand-dark/50 bg-fill-one"
                      placeholder="What are you looking..."
                      aria-label="top-bar-search"
                      name="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />

                    <button
                      type=" submit"
                      className=" absolute right-5 text-gray-600   "
                    >
                      <SearchIcon sx={{ fontSize: 24 }} />
                    </button>
                  </label>
                </form>
              </div>
              {suggestions.length > 0 && (
                <div
                  ref={suggestionListRef}
                  className="absolute top-11 z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {suggestions.length > 0 && (
                    <ul className="flex flex-col gap-y-2   cursor-default select-none py-2 pl-3 pr-9">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionSelect(suggestion)}
                          className="hover:cursor-pointer hover:bg-gray-100 truncate"
                        >
                          {highlightMatchedText(suggestion.name, query)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="ltr:ml-auto rtl:mr-auto md:ltr:ml-0 md:rtl:mr-0">
            <div className="flex  gap-x-6  items-center  ">
              <div className=" ">
                <Link
                  href={"/requestproduct/form"}
                  className="relative hidden lg:flex z-10 lg:top-[1px]"
                >
                  <button
                    type="button"
                    className="flex justify-center  items-center w-40 py-2 b  shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-[#4252fd]      "
                  >
                    <div>
                      {" "}
                      <AddCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                      <span className=" "> Product Request</span>
                    </div>
                  </button>
                </Link>
                <div
                  className={` ${
                    isHomePage && "hidden"
                  } relative lg:hidden   z-10  `}
                >
                  <button
                    onClick={handleInputFocus}
                    type="button"
                    className=" text-sm       "
                  >
                    <SearchIcon
                      sx={{ fontSize: [24, 28] }}
                      className="  text-white"
                    />
                  </button>
                </div>
                {/* <Link
                  href={"/contact"}
                  className={`relative  ${isHomePage ? "flex" : "hidden"}  `}
                >
                  <button
                    type="button"
                    className=" text-sm  lg:bg-[#2B39D1]   "
                  >
                    <HeadsetMicOutlinedIcon
                      sx={{ fontSize: [24, 28] }}
                      className="ml-2  text-white"
                    />
                  </button>
                </Link> */}
              </div>
              <Link
                href={"/cart"}
                className=" items-center text- justify-center shrink-0 h-auto focus:outline-none transform    flex  "
                aria-label="cart-button"
              >
                {cart.cartItems.length > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-4 h-4 text-white md:w-6 md:h-6 text-xs font-bold     bg-[#FFD700] border-2 border-white rounded-full -top-2 -end-2  ">
                    {cart.cartItems.length}
                  </div>
                )}
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: [24, 28] }}
                  className="text-white"
                />
              </Link>
              <div className="items-center flex shrink-0  ">
                <div className="  relative  cursor-pointer  z-50">
                  {session?.status === "authenticated" ? (
                    <Usermenu session={session} isLogin={isLogin} />
                  ) : (
                    <div onClick={() => signIn()}>
                      <AccountCircleOutlinedIcon
                        sx={{ fontSize: [24, 28] }}
                        className=" text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isHomePage && (
          <div
            className="relative lg:hidden flex w-full rounded-md  px-4 md:px-6 lg:px-8"
            onClick={handleInputFocus}
            noValidate=""
            role="search"
          >
            <label
              htmlFor="top-bar-search"
              className="flex   mb-2 flex-1 items-center py-0.5"
            >
              <input
                id="top-bar-search"
                className="text-heading p-2 bg-gray-100    rounded-full   placeholder:px-2 text-xs   overflow-hidden  w-full 2  "
                placeholder="What are you looking..."
                aria-label="top-bar-search"
                name="search"
                onFocus={handleInputFocus}
              />

              <SearchIcon
                sx={{ fontSize: 20 }}
                className=" absolute text-gray-500 right-8"
              />
            </label>
          </div>
        )}

        <MobileSearchModel
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
        <Example categories={categories} subCategories={subCategories} />
      </div>
    </>
  );
};
