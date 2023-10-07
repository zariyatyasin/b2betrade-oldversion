"use client";

import React, { useState } from "react";

const ProductPageImage = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="    flex-2  flex justify-center   ">
      <div className=" lg:flex   ">
        <div className=" mw-full max-w-[640px] max-h-[640px] flex justify-center ">
          {images && (
            <img
              className="    w-full max-h-[640px] object-cover"
              src={activeImg || images[active].url}
              alt=""
            />
          )}
        </div>

        <div className="mt-2  lg:mt-0  lg:order-first lg:mr-5     ">
          <div className="flex    lg:flex-col       ">
            {images?.map((img, i) => (
              <div
                className={`flex-0  lg:flex-col aspect-square mb-3  h-20   ${
                  i == active && "border-2 border-gray-900"
                } text-center  `}
                key={i}
                onMouseOver={() => setActive(i)}
              >
                <img
                  className="h-full    w-full object-cover"
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
