import Link from "next/link";
import React from "react";

export default function ListSupplierCard({ store }) {
  return (
    <div>
      <div key={store.id} className="py-6 sm:flex">
        <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
          <img
            src={store.image}
            alt={store.storeName}
            className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
          />
          <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
            <h1 className="text-lg font-medium text-gray-900">
              <Link href={`store/${store._id}`}>
                {" "}
                <div>{store.storeName}</div>
              </Link>
            </h1>
            <p className="text-sm text-gray-500 ">
              <span>{store.description}</span>
            </p>
            <p className="md:mt-8 mt-1 text-sm  text-gray-500">
              <h1>Location: {store.address.city}</h1>
              <h2> {store.ShopAddress}</h2>
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
          <Link
            href={`store/${store._id}`}
            className="w-full flex items-center justify-center bg-[#2B39D1] py-2 px-2.5 b  rounded-md shadow-sm text-sm font-medium text-white h sm:w-full sm:flex-grow-0"
          >
            View Details
          </Link>
          <button
            type="button"
            className="w-full flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50  sm:w-full sm:flex-grow-0"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
