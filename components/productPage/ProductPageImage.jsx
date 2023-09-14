"use client";

import React, { useState } from "react";

const ProductPageImage = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="    flex-1  flex justify-center   ">
      <div className="    lg:items-start">
        <div className="lg:order-2  ">
          <div className=" max-w-[640px] max-h-[640px]  rounded-lg flex  justify-center ">
            <img
              className="  rounded-lg   w-full  object-cover object-center"
              src={activeImg || images[active].url}
              alt=""
            />
          </div>
        </div>

        <div className="mt-2    w-full    ">
          <div className="flex   items-start        ">
            {images.map((img, i) => (
              <div
                className={`flex-0 aspect-square mb-3  h-20   ${
                  i == active && "border-2 border-gray-900"
                } text-center  rounded-lg`}
                key={i}
                onMouseOver={() => setActive(i)}
              >
                <img
                  className="h-full  rounded-lg w-full object-cover"
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
