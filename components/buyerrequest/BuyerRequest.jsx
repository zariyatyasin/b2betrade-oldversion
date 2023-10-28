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
// import Pattern from "./filter/Pattern";
// import Material from "./filter/Material";
// import HeaderFilters from "./filter/HeaderFilters";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import Style from "./filter/Styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function BuyerRequest({
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

  const productData = [
    {
      productName: "Creative Web Designer Needed for Dynamic Nonprofit: ",
      quantity: 10,
      description:
        "There are 2 automotive dealership webpages that I need to scrape on a consistent ongoing basis. I will need a script that will pull the data into an existing Google spreadsheet. I will provide the web URL once contacted. An example of some of the data will be: Year Make Model Trim Color Miles Price.",
      budget: 100,
      deliveryDate: "2023-11-05",
      location: "New York, USA",
      tags: ["Electronics", "Gadgets"],
      images: [
        "https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      argent: false,
    },
    {
      productName: "Creative Web Designer Needed for Dynamic Nonprofit: ",
      quantity: 10,
      description:
        "There are 2 automotive dealership webpages that I need to scrape on a consistent ongoing basis. I will need a script that will pull the data into an existing Google spreadsheet. I will provide the web URL once contacted. An example of some of the data will be: Year Make Model Trim Color Miles Price.",
      budget: 100,
      deliveryDate: "2023-11-05",
      location: "New York, USA",
      tags: ["Electronics", "Gadgets"],
      images: [
        "https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      argent: true,
    },
    {
      productName: "Creative Web Designer Needed for Dynamic Nonprofit: ",
      quantity: 10,
      description:
        "There are 2 automotive dealership webpages that I need to scrape on a consistent ongoing basis. I will need a script that will pull the data into an existing Google spreadsheet. I will provide the web URL once contacted. An example of some of the data will be: Year Make Model Trim Color Miles Price.",
      budget: 100,
      deliveryDate: "2023-11-05",
      location: "New York, USA",
      tags: ["Electronics", "Gadgets"],
      images: [
        "https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      argent: false,
    },
  ];

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
      if (existedQuery == value) {
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

  const filterUrl = ({
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,

    price,
    shipping,
    rating,
    sort,
    page,
  }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (brand) {
      currentQuery.set("brand", brand.toString());
    }
    if (category) {
      currentQuery.set("category", category);
    }
    if (style) {
      currentQuery.set("style", style);
    }
    if (size) {
      currentQuery.set("size", size);
    }
    if (color) {
      currentQuery.set("color", color);
    }
    if (pattern) {
      currentQuery.set("pattern", pattern);
    }
    if (material) {
      currentQuery.set("material", material);
    }
    if (price) {
      currentQuery.set("price", price);
    }
    if (shipping) {
      currentQuery.set("shipping", shipping);

      console.log("new", currentQuery.set("shipping", shipping));
    }
    if (rating) {
      currentQuery.set("rating", rating);
    }
    if (sort) {
      currentQuery.set("sort", sort);
    }
    if (page) {
      currentQuery.set("page", page);
    }

    const queryStr = currentQuery.toString();

    console.log("sdfsdf", queryStr);

    const newUrl = `${pathname}?${queryStr}`;
    console.log("tghis is url", newUrl);
    router.push(newUrl, { scroll: false });
  };

  const categoryHandle = (category) => {
    filterUrl({ category });
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
    filterUrl({ shipping });
  };
  const ratingHandler = (rating) => {
    filterUrl({ rating });
  };
  const sortHandler = (sort) => {
    if (sort == "") {
      filterUrl({ sort: {} });
    } else {
      filterUrl({ sort });
    }
  };
  const brandHandle = (brand) => {
    filterUrl({ brand });
  };
  const styleHandle = (style) => {
    filterUrl({ style });
  };
  const sizeHandle = (size) => {
    filterUrl({ size });
  };
  const patternHandle = (pattern) => {
    filterUrl({ pattern });
  };
  const materialHandle = (material) => {
    filterUrl({ material });
  };
  const colorHandle = (color) => {
    filterUrl({ color });
  };

  const pageHandler = (e, page) => {
    filterUrl({ page });
  };

  return (
    <div>
      <div className="bg-white  max-w-7xl mx-auto">
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
                  {/* <div className="p-4 space-y-6">
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
                  </div> */}
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
                  <div>PlusSmIcon</div>
                </button>

                <div className="hidden lg:block   ">
                  cat
                  {/* <div className="divide-y divide-gray-200 space-y-10    ">
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
                  </div> */}
                </div>
              </aside>

              <div className=" lg:ml-5   mt-6 lg:mt-0 lg:col-span-2 xl:col-span-4 divide-y border rounded-md overflow-hidden   ">
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

                {productData?.map((productData, id) => (
                  <div className="bg-white hover:bg-slate-100 cursor-pointer p-6 ">
                    <div className="flex items-center mb-4">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-[#333333] mb-2">
                            {productData.productName}
                          </h2>
                          {productData.argent && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs m-1">
                              Argent
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 text-sm mb-4">
                          {productData.description}
                        </p>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-base text-yellow-600 font-semibold">
                            ${productData.budget}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {productData.quantity} units
                          </p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-700 text-sm">
                            Delivery Date: {productData.deliveryDate}
                          </p>
                          <p className="text-gray-700 text-sm">
                            Location: {productData.location}
                          </p>
                        </div>
                        <div className="flex flex-wrap mb-2">
                          {productData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs m-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap">
                          {productData.images.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Product Image ${index}`}
                              className="w-16 h-16 object-cover m-1 rounded-lg border-2 border-green-600"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
