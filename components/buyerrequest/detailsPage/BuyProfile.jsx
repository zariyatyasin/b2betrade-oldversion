import React from "react";

export default function BuyProfile({ requestProductDetails }) {
  return (
    <div>
      <div className="bg-white px-4 py-5  shadow border sm:rounded-md sm:px-6">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src={requestProductDetails.userId.image}
                alt={requestProductDetails.userId.name}
              />
              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {requestProductDetails.userId.name}
            </h1>
            <p className="text-sm font-medium text-gray-500">supplier</p>
            <p className="text-sm font-medium text-gray-500">
              Joined on <time dateTime="2020-08-25">August 25, 2020</time>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-stretch">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
