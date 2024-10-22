"use client";
import React, { useEffect, useRef, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Usermenu from "./Usermenu";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { Button } from "../ui/button";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getServerSession } from "next-auth/next";
import Link from "next/link";

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

export const HeaderWithOutCat = ({ categories, subCategories }) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [query, setQuery] = useState(search);
  const [isLogin, setLogin] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  const pathname = usePathname();

  const siginIN = pathname === "/signin";
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
    <div className=" bg-[#2B39D1]   ">
      <div className="flex items-center justify-between h-16 py-4  border-b border-border-base top-bar lg:h-auto mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 2xl:px-10">
        <Link
          href="/"
          className="inline-block focus:outline-none text-white font-bold text-xl md:text-3xl max-w-[131px] "
        >
          B2B
          <span className=" text-[#FFD700]  text-2xl lg:text-3xl">eTrade</span>
        </Link>

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
          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <div
              className={`xl:mx-3.5  ${
                siginIN ? "flex items-center" : "hidden"
              } mx-2.5`}
            >
              <Link
                href={"/b2betrade/form/supplier"}
                className="relative z-10 lg:top-[1px] text-sm text-white "
              >
                Become a supplier
              </Link>
            </div>
            <Link
              href={"/contact"}
              className={`relative z-10  ${
                siginIN ? "hidden" : "flex"
              } lg:top-[1px] `}
            >
              <Button
                type="button"
                className=" text-sm text-white bg-[#2B39D1]   "
              >
                <HeadsetMicOutlinedIcon
                  sx={{ fontSize: 28 }}
                  className="ml-2 text-white"
                />
              </Button>
            </Link>
            <Link
              href={"/cart"}
              className="flex items-center text- justify-center shrink-0 h-auto focus:outline-none transform hidden lg:flex xl:mx-3.5 mx-2.5"
              aria-label="cart-button"
            >
              {cart.cartItems.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#FFD700] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                  {cart.cartItems.length}
                </div>
              )}
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: 28 }}
                className="ml-2 text-white"
              />
            </Link>
            <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
              <div className="  relative  cursor-pointer  z-50">
                {session?.status === "authenticated" ? (
                  <Usermenu session={session} isLogin={isLogin} />
                ) : (
                  <div onClick={() => signIn()}>
                    <AccountCircleOutlinedIcon
                      sx={{ fontSize: [24, 28] }}
                      className=" text-[#2B39D1] lg:text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
