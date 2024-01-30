import Image from "next/image";
import React from "react";

export default function StoreHeader({
  storeDescription,
  headerImage,
  storeName,
}) {
  return (
    <div className="relative  mt-4 ">
      <div className="absolute inset-0">
        <Image
          height={500}
          width={500}
          className="w-full h-full object-cover"
          src={
            headerImage?.length > 0
              ? headerImage[0]?.secure_url
              : "https://res.cloudinary.com/drtexlmq7/image/upload/v1705749427/bvxioa50sceeggcjqbuk.png"
          }
          alt=""
        />

        <div
          className="absolute inset-0 bg-gray-400 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-3xl">
          {storeName}
        </h1>
        <p className="mt-6 text-sm md:text-lg text-indigo-100 max-w-3xl">
          {storeDescription}
        </p>
      </div>
    </div>
  );
}
