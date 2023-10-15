"use client";
import React from "react";
import ProductCardSwip from "../cards/ProductCardSwip";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import CategoryFilter from "./filter/CategoryFilter";

import ColorsFilter from "./filter/ColorsFilter";
import { useSearchParams } from "next/navigation";
import Filters from "./filter/Filters";
import HeaderFilter from "./filter/HeaderFilter";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function BrowsePage({
  categories,
  products,
  subCategories,
  sizes,
  colors,
  brands,
  styles,
  patterns,
  materials,
}) {
  console.log(products);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [priceLimit, setPriceLimit] = useState("");
  const [filter, setFilter] = useState({
    freeShipping: false,
    rating: "",
  });
  const [selectedFilters, setSelectedFilters] = useState({
    Color: [],
    Category: [],
    Sizes: [],
  });
  const handleFilterChange = (filterCategory, selectedValues) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterCategory]: selectedValues,
    });
  };
  const handleHeaderFilterChange = (filterKey, value) => {
    if (filterKey === "freeShipping") {
      setFilter({ ...filter, freeShipping: !filter.freeShipping });
    } else if (filterKey === "rating") {
      setFilter({ ...filter, rating: value });
    }
  };
  const handleSortChange = (value) => {
    setSort(value);
  };
  const handlePriceLimitChange = (value) => {
    setPriceLimit(value);
  };

  return (
    <div>
      <div className="bg-white">
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
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6  lg:max-w-[1500px] lg:px-8">
            <div className="  border-gray-200 pb-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                New Arrivals
              </h1>
              <p className="mt-4 text-base text-gray-500">
                Checkout out the latest release of Basic Tees, new and improved
                with four openings!
              </p>
            </div>
            <HeaderFilter
              onFilterChange={handleHeaderFilterChange}
              onSortChange={handleSortChange}
              filter={filter}
              sort={sort}
              priceLimit={priceLimit}
              onPriceLimitChange={handlePriceLimitChange}
            />

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
                  <form className="divide-y divide-gray-200 space-y-10    ">
                    <CategoryFilter
                      categories={categories}
                      subCategories={subCategories}
                    />

                    <Filters
                      data={sizes}
                      name={"Sizes"}
                      onFilterChange={handleFilterChange}
                    />
                    <ColorsFilter colors={colors} />

                    <Filters
                      data={brands}
                      name={"Brands"}
                      onFilterChange={handleFilterChange}
                    />
                    <Filters
                      data={styles}
                      name={"Styles"}
                      onFilterChange={handleFilterChange}
                    />
                    <Filters
                      data={patterns}
                      name={"Patterns"}
                      onFilterChange={handleFilterChange}
                    />
                    <Filters
                      data={materials}
                      name={"Materials"}
                      onFilterChange={handleFilterChange}
                    />
                  </form>
                </div>
              </aside>

              <div className=" mt-6 lg:mt-0 lg:col-span-2 xl:col-span-4  ">
                <div className="  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {products?.map((item, id) => (
                    <div className="  " key={id}>
                      <ProductCardSwip products={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
