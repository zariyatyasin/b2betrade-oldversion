import React from "react";

export default function SellerBiding({ sellerRequest }) {
  return (
    <div className=" bg-gray-100 px-4 py-5    sm:rounded-md sm:px-6">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            {/* <img
                className="h-16 w-16 rounded-full"
                src={requestProductDetails.userId.image}
                alt={requestProductDetails.userId.name}
              /> */}
            <span
              className="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500   flex items-center">
        <p> Total Bider:</p>
        <p href="#" className="text-gray-900 ml-1">
          {sellerRequest.length}
        </p>
      </p>

      <ul className="divide-y divide-gray-200">
        {sellerRequest.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <img
                className="h-6 w-6 rounded-full"
                src={activityItem.sellerId.image}
                alt=""
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {activityItem.sellerId.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(activityItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-500"></p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col justify-stretch">
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2B39D1] "
        >
          End Biding
        </button>
      </div>
    </div>
  );
}
