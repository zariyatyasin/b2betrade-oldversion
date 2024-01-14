"use client";
import React from "react";
import ProductCardSwip from "../cards/ProductCardSwip";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import CategoryFilter from "./filter/CategoryFilter";
import Brand from "./filter/Brand";
import Sizes from "./filter/Sizes";
import ColorsFilter from "./filter/ColorsFilter";
import { useSearchParams } from "next/navigation";
import Filters from "./filter/Filters";
import Pattern from "./filter/Pattern";
import Material from "./filter/Material";
import HeaderFilters from "./filter/HeaderFilters";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Style from "./filter/Styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
export default function BrowsePage({
  categories,
  products,
  subCategories,
  sizes,
  colors,
  brands,
  styles,
  patterns,
  paginationCount,
  shipping,
  materials,
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

  // function replaceQuery(queryName, value) {
  //   const existedQuery = searchParams.get(queryName);
  //   const valueCheck = existedQuery?.search(value);

  //   const _check = existedQuery?.search(`_${value}`);

  //   let result = "";
  //   if (existedQuery) {
  //     if (existedQuery == value) {
  //       result = {};
  //     } else {
  //       if (valueCheck !== -1) {
  //         if (_check !== -1) {
  //           result = existedQuery?.replace(`_${value}`, "");
  //         } else if (valueCheck == 0) {
  //           result = existedQuery?.replace(`${value}_`, "");
  //         } else {
  //           result = existedQuery?.replace(value, "");
  //         }
  //       } else {
  //         result = `${existedQuery}_${value}`;
  //       }
  //     }
  //   } else {
  //     result = value;
  //   }
  //   return {
  //     result,
  //     active: existedQuery && valueCheck !== -1 ? true : false,
  //   };
  // }
  const filterUrl = ({
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    subCategories,
    price,
    shipping,
    rating,
    sort,
    page,
  }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (brand !== undefined) {
      currentQuery.set("brand", brand.toString());
    }
    if (category !== undefined) {
      currentQuery.set("category", category);
    }
    if (subCategories !== undefined) {
      currentQuery.set("subCategories", subCategories);
    }
    if (style !== undefined) {
      currentQuery.set("style", style);
    }
    if (size !== undefined) {
      currentQuery.set("size", size);
    }
    if (color !== undefined) {
      currentQuery.set("color", color);
    }
    if (pattern !== undefined) {
      currentQuery.set("pattern", pattern);
    }
    if (material !== undefined) {
      currentQuery.set("material", material);
    }
    if (price !== undefined) {
      currentQuery.set("price", price);
    }
    if (shipping !== undefined) {
      currentQuery.set("shipping", shipping);
    }
    if (rating !== undefined) {
      currentQuery.set("rating", rating);
    }

    if (sort !== undefined) {
      currentQuery.set("sort", sort);
    }
    if (page !== undefined) {
      currentQuery.set("page", page);
    }

    const queryStr = currentQuery.toString();

    const newUrl = `${pathname}?${queryStr}`;

    router.push(newUrl, { scroll: false });
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
  const subcategoryHandle = (subCategories) => {
    if (subCategories) {
      filterUrl({ subCategories });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("subCategories");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  // const priceHandler = (price, type) => {
  //   let priceQuery = searchParams.get("price")?.split("_") || "";
  //   let min = priceQuery[0] || "";
  //   let max = priceQuery[1] || "";
  //   let newPrice = "";
  //   if (type == "min") {
  //     newPrice = `${price}_${max}`;
  //   } else {
  //     newPrice = `${min}_${price}`;
  //   }
  //   filterUrl({ price: newPrice });
  // };
  const priceHandler = (minPrice, maxPrice) => {
    let newPrice = "";

    if (minPrice !== "" || maxPrice !== "") {
      newPrice = `${minPrice}_${maxPrice}`;
    }

    filterUrl({ price: newPrice });
  };

  const multiPriceHandler = (min, max) => {
    filterUrl({ price: `${min}_${max}` });
  };
  const shippingHandler = (shipping) => {
    if (shipping) {
      filterUrl({ shipping });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("shipping");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const ratingHandler = (rating) => {
    if (rating) {
      filterUrl({ rating });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("rating");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };

  const sortHandler = (sort) => {
    if (sort) {
      filterUrl({ sort });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("sort");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const brandHandle = (brand) => {
    if (brand) {
      filterUrl({ brand });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("brand");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const styleHandle = (style) => {
    if (style) {
      filterUrl({ style });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("style");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const sizeHandle = (size) => {
    if (size) {
      filterUrl({ size });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("size");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const patternHandle = (pattern) => {
    if (pattern) {
      filterUrl({ pattern });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("pattern");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const materialHandle = (material) => {
    if (material) {
      filterUrl({ material });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("material");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const colorHandle = (color) => {
    if (color) {
      filterUrl({ color });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("color");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };

  const pageHandler = (e, page) => {
    filterUrl({ page });
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
                  <div className="p-4 space-y-6">
                    <HeaderFilters
                      priceHandler={priceHandler}
                      multiPriceHandler={multiPriceHandler}
                      shippingHandler={shippingHandler}
                      ratingHandler={ratingHandler}
                      sortHandler={sortHandler}
                      replaceQuery={replaceQuery}
                    />
                    <CategoryFilter
                      categories={categories}
                      subCategories={subCategories}
                      categoryHandle={categoryHandle}
                      checkChecked={checkChecked}
                    />

                    <Sizes
                      data={sizes}
                      name={"Sizes"}
                      sizeHandle={sizeHandle}
                      replaceQuery={replaceQuery}
                    />
                    <ColorsFilter
                      colors={colors}
                      replaceQuery={replaceQuery}
                      colorHandle={colorHandle}
                    />

                    <Brand
                      brands={brands}
                      brandHandle={brandHandle}
                      replaceQuery={replaceQuery}
                    />
                    <Style
                      data={styles}
                      name={"Styles"}
                      replaceQuery={replaceQuery}
                      styleHandle={styleHandle}
                    />
                    <Pattern
                      data={patterns}
                      name={"Patterns"}
                      patternHandle={patternHandle}
                      replaceQuery={replaceQuery}
                    />
                    <Material
                      data={materials}
                      name={"Materials"}
                      materialHandle={materialHandle}
                      replaceQuery={replaceQuery}
                    />
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6  lg:max-w-[1500px] lg:px-8">
            <div className="  border-gray-200 pb-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                New Arrivals
              </h1>
              <p className="mt-4 text-base text-gray-500">
                Checkout out the latest release of Basic Tees, new and improved
                with four openings!
              </p>
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
                  <div className="divide-y divide-gray-200 space-y-10    ">
                    <CategoryFilter
                      categories={categories}
                      subCategories={subCategories}
                      categoryHandle={categoryHandle}
                      checkChecked={checkChecked}
                      subcategoryHandle={subcategoryHandle}
                    />

                    <Sizes
                      data={sizes}
                      name={"Sizes"}
                      sizeHandle={sizeHandle}
                      replaceQuery={replaceQuery}
                    />
                    <ColorsFilter
                      colors={colors}
                      replaceQuery={replaceQuery}
                      colorHandle={colorHandle}
                    />

                    <Brand
                      brands={brands}
                      brandHandle={brandHandle}
                      replaceQuery={replaceQuery}
                    />
                    <Style
                      data={styles}
                      name={"Styles"}
                      replaceQuery={replaceQuery}
                      styleHandle={styleHandle}
                    />
                    <Pattern
                      data={patterns}
                      name={"Patterns"}
                      patternHandle={patternHandle}
                      replaceQuery={replaceQuery}
                    />
                    <Material
                      data={materials}
                      name={"Materials"}
                      materialHandle={materialHandle}
                      replaceQuery={replaceQuery}
                    />
                  </div>
                </div>
              </aside>

              <div className=" lg:ml-5   mt-6 lg:mt-0 lg:col-span-2 xl:col-span-4   ">
                <div className=" hidden lg:block">
                  <HeaderFilters
                    priceHandler={priceHandler}
                    multiPriceHandler={multiPriceHandler}
                    shippingHandler={shippingHandler}
                    ratingHandler={ratingHandler}
                    sortHandler={sortHandler}
                    replaceQuery={replaceQuery}
                  />
                </div>
                <div className="   grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
                  {products?.map((item, id) => (
                    <div className="  " key={id}>
                      <ProductCardSwip products={item} />
                    </div>
                  ))}
                </div>

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
