"use client";

import Link from "next/link";
import React, { useState } from "react";
import ProductSwiper from "./ProductSwiper";

function ProductCardSwip({ products }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(products.subProducts[active]?.images);

  const hasNullPrice =
    products.bulkPricing &&
    products.bulkPricing.some((bulkPrice) => bulkPrice.price === null);
  const price = products.bulkPricing.map((bulkPrice) => bulkPrice.price);
  const highPrice = Math.max(...price);
  const lowPrice = Math.min(...price);

  const [prices, setPrices] = useState(
    products.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );
  const [style, setStyle] = useState(
    products.subProducts.map((p) => {
      return p.color;
    })
  );

  const firstSizeBulkPricing = products.subProducts[0].sizes[0].bulkPricing;

  const minPrice = Math.min(
    ...firstSizeBulkPricing.map((pricing) => pricing.price)
  );
  const maxPrice = Math.max(
    ...firstSizeBulkPricing.map((pricing) => pricing.price)
  );
  const minQty2 = products.bulkPricing[0].minQty;
  const minQty = firstSizeBulkPricing[0].minQty;
  return (
    <div className=" bg-white border border-gray-200 rounded-md overflow-hidden  ">
      <Link
        href={`/product/${products?.slug}/${active}/0 `}
        className=" sm:h-96 "
      >
        <div className=" h-72 w">
          <ProductSwiper images={images} />
        </div>
      </Link>
      <div className=" absolute right-0 top-0 z-10 ">
        {products?.discount ? (
          <div className=" bg-green-400 text-white text-xs px-2 py-1 ml-3  ">
            {products.discount + "%"}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className=" text-left text-gray-950 font-medium   text-sm   p-2">
        <Link href={`/product/${products?.slug}/${active}/0 `}>
          {products.name.length <= 10
            ? products.name
            : products.name.slice(0, 35) + "..."}
        </Link>

        <div className="mt-1 ">
          {!hasNullPrice && (
            <div>
              {products.bulkPricing.length === 1 ? (
                // Display the single price
                <p className=" text-gray-950 text-lg font-bold">
                  {" "}
                  {products.bulkPricing[0].price.toLocaleString("en-US")} ৳
                </p>
              ) : (
                <div>
                  <p className=" text-gray-950 text-lg font-bold">
                    {lowPrice.toLocaleString("en-US")}৳ -{" "}
                    {highPrice.toLocaleString("en-US")}৳
                  </p>
                </div>
              )}
            </div>
          )}
          {hasNullPrice && (
            <div>
              <p className=" text-gray-950 text-lg font-bold">
                {" "}
                {minPrice.toLocaleString("en-US")}৳ -{" "}
                {maxPrice.toLocaleString("en-US")}৳
              </p>
            </div>
          )}

          <div className=" text-left mt-1">
            {!hasNullPrice ? (
              <p>Min order: {minQty2}</p>
            ) : (
              <p>Min order: {minQty}</p>
            )}
          </div>
        </div>
        {/* <div className="w-full flex-none text-sm flex items-center text-gray-600">
          <ul className="flex flex-row justify-center items-center space-x-2">
            {style &&
              style.map((style, i) =>
                style.image ? (
                  <span
                    key={i}
                    className="block p-1 border-2 border-gray-100 hover:border-blue-600 rounded-full transition ease-in duration-300"
                  >
                    <img
                      src={style.image}
                      className="block w-5 h-5 rounded-full"
                      onMouseOver={() => {
                        if (
                          products.subProducts[i] &&
                          products.subProducts[i].images
                        ) {
                          setImages(products.subProducts[i].images);
                          setActive(i);
                        }
                      }}
                    ></img>
                  </span>
                ) : (
                  style.color && (
                    <div
                      className={`h-5 w-5 rounded-md`}
                      style={{ backgroundColor: style.color }}
                    ></div>
                  )
                )
              )}

             
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default ProductCardSwip;
