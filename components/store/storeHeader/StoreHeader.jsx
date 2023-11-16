import React from "react";

export default function StoreHeader({
  storeDescription,
  headerImage,
  storeName,
}) {
  return (
    <div className="relative  ">
      <div className="absolute inset-0">
        <img className="w-full h-full object-cover" src={headerImage} alt="" />
        <div
          className="absolute inset-0 bg-gray-400 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-3xl">
          {storeName}
        </h1>
        <p className="mt-6 text-lg text-indigo-100 max-w-3xl">
          {storeDescription}
        </p>
      </div>
    </div>
  );
}