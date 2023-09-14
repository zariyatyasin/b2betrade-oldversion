import React, { useState } from "react";

export default function SideImage({ images, activeImg }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col-reverse">
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <div
          className="grid grid-cols-4 gap-6"
          aria-orientation="horizontal"
          role="tablist"
        >
          {images.map((img, i) => (
            <button
              key={i}
              id="tabs-2-tab-1"
              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
              onMouseOver={() => setActive(i)}
              aria-controls="tabs-2-panel-1"
              role="tab"
              type="button"
            >
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </span>

              <span
                className="ring-transparent absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                aria-hidden="true"
              ></span>
            </button>
          ))}
        </div>
      </div>

      <div className=" max-w-sm   aspect-w-1 aspect-h-1">
        <div
          id="tabs-2-panel-1"
          aria-labelledby="tabs-2-tab-1"
          role="tabpanel"
          tabindex="0"
        >
          <img
            src={activeImg || images[active].url}
            alt="Angled front view with bag zipped and handles upright."
            className="w-full h-full object-center object-cover sm:rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
