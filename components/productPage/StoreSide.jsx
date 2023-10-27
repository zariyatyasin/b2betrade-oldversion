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
    <div className=" mt-10 ">
      <div>
        <div className="bg-white relative shadow rounded-lg  mx-auto">
          <div className="flex justify-center">
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt=""
              className="rounded-full mx-auto absolute -top-5 w-14 h-14 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-sm text-gray-900">
              Pantazi Software
            </h1>
            <p className="text-center text-sm text-gray-400 font-medium">
              UI Components Factory
            </p>
            <p>
              <span></span>
            </p>
            <div className=" w-full flex items-center justify-evenly my-2 ">
              <button className="py-2  w-32 bg-green-500 text-sm border border-green-500 text-white">
                View Store
              </button>
              <button className="py-2  w-32 bg-green-500 text-sm border border-green-500 text-white">
                Message
              </button>
            </div>
            <div className="flex justify-between items-center my-5 px-6">
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Facebook
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Twitter
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Instagram
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Email
              </a>
            </div>

            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6">
                Recent activites
              </h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Updated his status
                  <span className="text-gray-500 text-xs">24 min ago</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
