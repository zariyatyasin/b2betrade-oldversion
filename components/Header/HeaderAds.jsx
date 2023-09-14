import React from "react";
import AdsImg from "../../public/ads/adheader.gif";
import Image from "next/image";
export const HeaderAds = () => {
  return (
    <div className=" bg-gray-950 ">
      {/* <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800"></span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden"> We announced a new product! </span>
              <span className="hidden md:inline">
                {" "}
                Big news! We're excited to announce a brand new product.{" "}
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            >
              {" "}
              Learn more{" "}
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>

              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div> */}

      <div className="   h-10">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image alt="Mountains" src={AdsImg} layout="fill" />
        </div>
      </div>
    </div>
  );
};
