import React from "react";

export default function StoreSide() {
  return (
    <div className="  ">
      <div className="flex  overflow-hidden flex-col justify-center items-center border  max-w-[250px]  rounded-lg shadow">
        <div className="relative flex flex-col items-center overflow-hidden  max-w-[250px]  mx-auto   bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <img
              src="https://thumbs.dreamstime.com/b/web-183282388.jpg"
              className="absolute flex h-32 w-full justify-center   bg-cover"
            />
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img
                className="h-full w-full rounded-full"
                src="https://thumbs.dreamstime.com/b/web-183282388.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center ">
            <div className="flex items-center">
              <h4 className="text-base font-bold text-navy-700 dark:text-white">
                Adela Parkson
              </h4>
              <img
                src="https://www.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
                className="h-4 w-4 ml-2 rounded-full"
              />
            </div>

            <p className="text-base font-normal text-gray-600">
              Best store for you
            </p>
          </div>
          <div className="mt- mb-3 flex gap-8 md:!gap-8 p-4">
            <div className="flex flex-col items-center justify-center">
              <p className=" text-base font-bold text-navy-700 dark:text-white">
                17
              </p>
              <p className="text-sm font-normal text-gray-600">Product</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className=" text-base font-bold text-navy-700 dark:text-white">
                9.7K
              </p>
              <p className="text-sm font-normal text-gray-600">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className=" text-base font-bold text-navy-700 dark:text-white">
                434
              </p>
              <p className="text-sm font-normal text-gray-600">Sales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
