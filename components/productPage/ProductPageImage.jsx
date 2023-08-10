"use client";

import React, { useState } from "react";

const ProductPageImage = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="lg:col-span-3 lg:row-end-1 md:col-span-5 ">
      <div className="lg:flex lg:items-start">
        <div className="lg:order-2 lg:ml-5">
          <div className=" max-w-xl   ">
            <img
              className="h-full w-full   object-cover"
              src={activeImg || images[active].url}
              alt=""
            />
          </div>
        </div>

        <div className="mt-2    w-full lg:order-1 lg:w-20 lg:flex-shrink-0">
          <div className="flex flex-row items-start lg:flex-col">
            {images.map((img, i) => (
              <div
                className={`flex-0 aspect-square mb-3 h-20 overflow-hidden  ${
                  i == active && "border-2 border-gray-900"
                } text-center`}
                key={i}
                onMouseOver={() => setActive(i)}
              >
                <img
                  className="h-full w-full object-cover"
                  src={img.url}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageImage;
