/* This example requires Tailwind CSS v2.0+ */
"use client";
import { useState } from "react";
import InquiryForm from "../../chat/InquiryForm";

export default function StoreNavbar({ subCategory, storeName, storeId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <header className=" ">
      <nav className="  px-4 sm:px-6 lg:px-0" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between  ">
          <div className="flex items-center">
            {/* <div className="hidden   space-x-8 lg:block">
              {subCategory.map((link) => (
                <a className="text-base font-medium text-black  uppercase">
                  {link.name}
                </a>
              ))}
            </div> */}
          </div>
          <div className="  space-x-4">
            <button
              type="button"
              onClick={openModal}
              className="w-full flex items-center justify-center bg-[#2B39D1] py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white"
            >
              Send Message
            </button>
          </div>
        </div>
        {/* <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {subCategory.map((link) => (
            <a className="text-base font-medium text-black uppercase ">
              {link.name}
            </a>
          ))}
        </div> */}
      </nav>
      {isModalOpen && (
        <div className="fixed z-50 bottom-0 left-1/2 md:left-auto md:right-0    transform -translate-x-1/2 md:translate-x-0   bg-white p-8 rounded-md w-full md:w-1/2 shadow-2xl border">
          <InquiryForm
            name={storeName}
            onClose={closeModal}
            storeId={storeName}
          />
        </div>
      )}
    </header>
  );
}
