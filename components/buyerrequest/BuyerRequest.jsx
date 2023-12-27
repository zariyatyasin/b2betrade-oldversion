"use client";
import React from "react";
// import ProductCardSwip from "../cards/ProductCardSwip";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
// import CategoryFilter from "./filter/CategoryFilter";
// import Brand from "./filter/Brand";
// import Sizes from "./filter/Sizes";
// import ColorsFilter from "./filter/ColorsFilter";
import { useSearchParams } from "next/navigation";
// import Filters from "./filter/Filters";
import BuyerRequestCard from "../cards/BuyerRequestCard";
// import Pattern from "./filter/Pattern";
// import Material from "./filter/Material";
// import HeaderFilters from "./filter/HeaderFilters";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MiniSearchBar } from "../search/Searchbar";
import CheckBoxFilter from "./filter/CheckBoxFilter";
import CategoryFilter from "./filter/CategoryFilter";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Header } from "./header/Header";
export default function BuyerRequest({
  categories,

  subCategories,
  paginationCount,
  products,
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
    const valueCheck = existedQuery?.search(value);

    const _check = existedQuery?.search(`_${value}`);

    let result = "";
    if (existedQuery) {
      console.log("meiw");
      if (existedQuery == value) {
        console.log("value,", value, existedQuery);
        result = {};
      } else {
        if (valueCheck !== -1) {
          if (_check !== -1) {
            result = existedQuery?.replace(`_${value}`, "");
          } else if (valueCheck == 0) {
            result = existedQuery?.replace(`${value}_`, "");
          } else {
            result = existedQuery?.replace(value, "");
          }
        } else {
          result = `${existedQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }
    return {
      result,
      active: existedQuery && valueCheck !== -1 ? true : false,
    };
  }

  const filterUrl = ({ location, category, page }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (location) {
      currentQuery.set("location", location);
    }

    if (category) {
      currentQuery.set("category", category);
    }

    if (page) {
      currentQuery.set("page", page);
    }

    const queryStr = currentQuery.toString();

    const newUrl = `${pathname}?${queryStr}`;
    console.log("tghis is url", newUrl);
    router.push(newUrl, { scroll: false });
  };

  const locationsHandle = (location) => {
    filterUrl({ location });
  };
  const categoryHandle = (category) => {
    filterUrl({ category });
  };
  const pageHandler = (e, page) => {
    filterUrl({ page });
  };

  return (
    <div>
      <div className="bg-white  max-w-6xl mx-auto mt-8">
        <div>
          <main className="max-w-3xl mx-auto py-5 px-4 sm:py-10 sm:px-6  lg:max-w-[1500px] lg:px-8">
            <div className="  border-gray-200 ">
              <h1 className="text-3xl  font-medium pb-8  tracking-tight text-gray-900">
                Buyer Request
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
                  <div>PlusSmIcon</div>
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

              <div className=" lg:ml-5   mt-6 lg:mt-0 lg:col-span-2 xl:col-span-4 divide-y border shadow rounded-md overflow-hidden   ">
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
                  <MiniSearchBar linkUrl="/browse/buyerrequest" />
                </div>

                {products?.map((productData, id) => (
                  <BuyerRequestCard productData={productData} key={id} />
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
