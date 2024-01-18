"use client";
import React from "react";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useSearchParams } from "next/navigation";

import ListSupplierCard from "./ListSupplierCard";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MiniSearchBar } from "../search/Searchbar";
import CheckBoxFilter from "./filter/CheckBoxFilter";
import CategoryFilter from "./filter/CategoryFilter";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function BuyerRequest({
  categories,
  name,
  subCategories,
  paginationCount,
  store,
  locations,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  function checkChecked(queryName, value) {
    if (searchParams.get(queryName)?.search(value) !== -1) {
      return true;
    }
    return false;
  }
  function replaceQuery(queryName, value) {
    const existedQuery = searchParams.get(queryName);

    let result = "";

    if (existedQuery) {
      const valueCheck = existedQuery.includes(value);
      const underscoredValue = `_${value}`;

      if (valueCheck) {
        if (existedQuery === value) {
          result = "";
        } else {
          result = existedQuery
            .replace(underscoredValue, "")
            .replace(value, "");
        }
      } else {
        result = `${existedQuery}_${value}`;
      }
    } else {
      result = value;
    }

    return {
      result,
      active: existedQuery && result !== "" ? true : false,
    };
  }

  const filterUrl = ({ location, category, page, subCategories }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (location !== undefined) {
      currentQuery.set("location", location);
    }

    if (category !== undefined) {
      currentQuery.set("category", category);
    }
    if (subCategories !== undefined) {
      currentQuery.set("subCategories", subCategories);
    }
    if (page !== undefined) {
      currentQuery.set("page", page);
    }

    const queryStr = currentQuery.toString();

    const newUrl = `${pathname}?${queryStr}`;

    router.push(newUrl, { scroll: false });
  };

  const locationsHandle = (location) => {
    if (location) {
      filterUrl({ location });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("location");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const categoryHandle = (category) => {
    if (category) {
      filterUrl({ category });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("category");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const pageHandler = (e, page) => {
    filterUrl({ page });
  };

  //   const pageHandler = (color) => {
  //     if (color) {
  //       filterUrl({ color });
  //     } else {
  //       const currentQuery = new URLSearchParams(searchParams.toString());
  //       currentQuery.delete("color");
  //       router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
  //     }
  //   };

  return (
    <div>
      <div className="mt-4 mb-4 px-4 lg:hidden">
        <Link className="" href={"/"}>
          <KeyboardBackspaceIcon sx={{ fontSize: 28 }} />
        </Link>
      </div>
      <div className="bg-white  max-w-6xl mx-auto mt-8">
        <div>
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      close
                    </button>
                  </div>
                  <div className="p-4 space-y-6">
                    <CategoryFilter
                      categories={categories}
                      subCategories={subCategories}
                      categoryHandle={categoryHandle}
                      checkChecked={checkChecked}
                      replaceQuery={replaceQuery}
                    />

                    <CheckBoxFilter
                      data={locations}
                      name={"Loaction"}
                      handle={locationsHandle}
                      replaceQuery={replaceQuery}
                    />
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>
          <main className="max-w-3xl mx-auto py-5 px-4 sm:py-10 sm:px-6  lg:max-w-[1500px] lg:px-8">
            <div className="  border-gray-200 ">
              <h1 className="text-3xl uppercase  font-medium pb-8  tracking-tight text-gray-900">
                {name} List
              </h1>
            </div>

            <div className=" lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-5 ">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                  type="button"
                  className="inline-flex items-center lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">
                    Filters
                  </span>
                  <div>
                    <FilterListOutlinedIcon />
                  </div>
                </button>

                <div className="hidden lg:block   ">
                  <div className=" mb-4 text-lg font-semibold">Filter By</div>
                  <div className="divide-y divide-gray-200      ">
                    <CategoryFilter
                      categories={categories}
                      subCategories={subCategories}
                      categoryHandle={categoryHandle}
                      checkChecked={checkChecked}
                      replaceQuery={replaceQuery}
                    />

                    <CheckBoxFilter
                      data={locations}
                      name={"Loaction"}
                      handle={locationsHandle}
                      replaceQuery={replaceQuery}
                    />
                  </div>
                </div>
              </aside>

              <div className=" lg:ml-5   mt-6 lg:mt-0 lg:col-span-2 xl:col-span-4 divide-y   rounded-md overflow-hidden   ">
                {/* <div className=" hidden lg:block">
                  <HeaderFilters
                    priceHandler={priceHandler}
                    multiPriceHandler={multiPriceHandler}
                    shippingHandler={shippingHandler}
                    ratingHandler={ratingHandler}
                    sortHandler={sortHandler}
                    replaceQuery={replaceQuery}
                  />
                </div> */}

                <div className="p-4">
                  {/* <MiniSearchBar linkUrl="/browse/b" /> */}
                </div>

                {store?.map((store, id) => (
                  <ListSupplierCard store={store} key={id} />
                ))}

                <div className="mt-28">
                  <Stack spacing={2}>
                    <Pagination
                      count={paginationCount}
                      defaultPage={Number(searchParams.page) || 1}
                      onChange={pageHandler}
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
