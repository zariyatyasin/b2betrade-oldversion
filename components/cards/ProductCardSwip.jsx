import Link from "next/link";
import React, { useState } from "react";
import ProductSwiper from "./ProductSwiper";

function ProductCardSwip({ products }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(products.subProducts[active]?.images);

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

  return (
    <div>
      <div className=" relative h-auto   ">
        <Link href={`/product/${products.slug}/${active} `}>
          <ProductSwiper images={images} />
        </Link>
        <div className=" absolute right-0 top-0 z-10 ">
          {products.subProducts[active].discount ? (
            <div className=" bg-green-400 text-white text-xs px-2 py-1 ml-3  ">
              {products.subProducts[active].discount + "%"}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="  ">
          {/* <h2 className="  mr-auto cursor-pointer   truncate ">
            Lorem ipsum is placeholder text commonly used in the graphic
          </h2> */}
        </div>
        {prices.length === 1 ? (
          <div className=" text-red-500 text-left text-sm mt-2  font-semibold  ">{`USD${prices[0]}$`}</div>
        ) : (
          <div className=" text-red-500 text-left text-sm mt-2  font-semibold  ">{`USD${
            prices[0]
          }$ - ${prices[prices.length - 1]}$`}</div>
        )}
        <div className="w-full flex-none text-sm flex items-center text-gray-600">
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
                      className="block w-5 h-5  0 rounded-full"
                      onMouseOver={() => {
                        setImages(products.subProducts[i].images);
                        setActive(i);
                      }}
                    ></img>
                  </span>
                ) : (
                  <span
                    className={`block p-1 border-2 border-gray-100 hover:${style.color} rounded-full transition ease-in duration-300`}
                  >
                    <a
                      href="#blue"
                      className={`block w-5 h-5 ${style.color} rounded-full`}
                    ></a>
                  </span>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSwip;
