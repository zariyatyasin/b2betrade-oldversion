import React from "react";

export default function StoreSide() {
  return (
    // <div className="  ">
    //   <div className="flex  overflow-hidden flex-col justify-center items-center border  max-w-[250px]  rounded-lg shadow">
    //     <div className="relative flex flex-col items-center overflow-hidden  max-w-[250px]  mx-auto   bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
    //       <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
    //         <img
    //           src="https://thumbs.dreamstime.com/b/web-183282388.jpg"
    //           className="absolute flex h-32 w-full justify-center   bg-cover"
    //         />
    //         <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
    //           <img
    //             className="h-full w-full rounded-full"
    //             src="https://thumbs.dreamstime.com/b/web-183282388.jpg"
    //             alt=""
    //           />
    //         </div>
    //       </div>
    //       <div className="mt-16 flex flex-col items-center ">
    //         <div className="flex items-center">
    //           <h4 className="text-base font-bold text-navy-700 dark:text-white">
    //             Adela Parkson
    //           </h4>
    //           <img
    //             src="https://www.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
    //             className="h-4 w-4 ml-2 rounded-full"
    //           />
    //         </div>

    //         <p className="text-base font-normal text-gray-600">
    //           Best store for you
    //         </p>
    //       </div>
    //       <div className="mt- mb-3 flex gap-8 md:!gap-8 p-4">
    //         <div className="flex flex-col items-center justify-center">
    //           <p className=" text-base font-bold text-navy-700 dark:text-white">
    //             17
    //           </p>
    //           <p className="text-sm font-normal text-gray-600">Product</p>
    //         </div>
    //         <div className="flex flex-col items-center justify-center">
    //           <p className=" text-base font-bold text-navy-700 dark:text-white">
    //             9.7K
    //           </p>
    //           <p className="text-sm font-normal text-gray-600">Followers</p>
    //         </div>
    //         <div className="flex flex-col items-center justify-center">
    //           <p className=" text-base font-bold text-navy-700 dark:text-white">
    //             434
    //           </p>
    //           <p className="text-sm font-normal text-gray-600">Sales</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="my-10 mx-auto max-w-md">
      <div className="bg-white shadow-lg rounded-md p-4">
        <div className="flex justify-center">
          <img
            src="https://avatars0.githubusercontent.com/u/35900628?v=4"
            alt=""
            className="rounded-full w-24 h-24 shadow-md border-4 border-white transform hover:scale-110"
          />
        </div>

        <div className="mt-6 text-center">
          <div className="font-bold text-xl">Pantazi Software</div>
          <div className="flex items-center justify-center mt-2">
            <img
              src="https://www.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
              className="h-4 w-4 mr-2 rounded-full"
              alt="Verified Badge"
            />
            <span className="text-gray-500">Verified</span>
          </div>
          <p className="text-gray-400 font-medium text-sm mt-2">
            UI Components Factory
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <button className="py-2 w-32 bg-green-500 text-sm rounded-md border border-green-500 text-white mr-2">
            View Store
          </button>
          <button className="py-2 w-32 bg-green-500 text-sm rounded-md border border-green-500 text-white">
            Message
          </button>
        </div>

        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Store rating</p>
            <div className="text-sm font-bold">4.9/5</div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">
              On-time delivery rate
            </p>
            <div className="text-sm font-bold">100.0%</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Response time</p>
            <div className="text-sm font-bold">&le;3h</div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Floorspace</p>
            <div className="text-sm font-bold">7000m²</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-900">Services</h3>
          <div className="mt-2 text-sm text-center">
            <p>Custom UI Design</p>
            <p>Responsive Web Development</p>
          </div>
        </div>
      </div>
    </div>
  );
}
