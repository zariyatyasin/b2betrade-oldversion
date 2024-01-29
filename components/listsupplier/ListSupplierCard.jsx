import Link from "next/link";
import React, { useState } from "react";
import InquiryForm from "../chat/InquiryForm";

export default function ListSupplierCard({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div key={store.id} className="py-6  lg:flex">
        <div className="flex space-x-4 sm:space-x-6 lg:space-x-8">
          <img
            src={
              store.image.length > 0
                ? store.image[0][0].secure_url
                : "https://res.cloudinary.com/drtexlmq7/image/upload/v1705749427/bvxioa50sceeggcjqbuk.png"
            }
            alt={store.storeName}
            className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
          />
          <div className=" min-w-0 flex-1 sm:pt-0">
            <h1 className="text-lg font-medium text-gray-900 truncate">
              <Link href={`store/${store._id}`}>
                <div>{store.storeName}</div>
              </Link>
            </h1>
            <p className="text-sm mt-4 hidden lg:flex text-gray-950   ">
              <span>
                {store.description.length > 120
                  ? `${store.description.substring(0, 120)}...`
                  : store.description}
              </span>
            </p>
            <p className="md:mt-8 mt-1 text-sm  text-gray-950">
              <h1>Location: {store.address.city}</h1>
              <h2 className=" truncate"> {store.ShopAddress}</h2>
            </p>
          </div>
        </div>
        <p className="text-sm mt-4 flex lg:hidden text-gray-950   ">
          <span>
            {store.description.length > 80
              ? `${store.description.substring(0, 80)}...`
              : store.description}
          </span>
        </p>

        <div className=" mt-4 md:mt-6 space-y-4 sm:mt-0 lg:ml-6 lg:flex-none lg:w-40">
          <Link
            href={`store/${store._id}`}
            className="w-full flex items-center justify-center bg-[#2B39D1] py-2 px-2.5 b  rounded-md shadow-sm text-sm font-medium text-white h sm:w-full sm:flex-grow-0"
          >
            View Details
          </Link>
          {/* <button
            onClick={openModal}
            className="w-full flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50  sm:w-full sm:flex-grow-0"
          >
            Send Message
          </button> */}
        </div>
      </div>
      {/* {isModalOpen && (
        <div className="fixed z-50 bottom-0 left-1/2 md:left-auto md:right-0    transform -translate-x-1/2 md:translate-x-0   bg-white p-8 rounded-md w-full md:w-1/2 shadow-2xl border">
          <InquiryForm
            name={store.storeName}
            onClose={closeModal}
            storeId={store._id}
          />
        </div>
      )} */}
    </div>
  );
}
