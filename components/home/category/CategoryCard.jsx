import Link from "next/link";
import React from "react";

const CategoryCard = ({ id, icon, name, slug }) => {
  return (
    <div className=" cursor-pointer  ">
      <div className="swiper-slide">
        <Link
          href={`/browse?category=${id}`}
          className="group flex justify-center  rounded-lg flex-col h-28 sm:h-[8.5rem] md:h-40 xl:h-[11.5rem]   bg-gray-50 hover:bg-gray-200"
        >
          <div className="relative flex items-center mb-3.5 md:mb-2 lg:mb-5 xl:mb-2 2xl:mb-6 3xl:mb-4 lg:h-24 mx-auto">
            <img
              src={icon}
              alt={slug}
              className=" mx-auto mb-4 sm:mb-6  w-14 lg:w-20  "
            />
          </div>
          <div className="flex flex-col">
            <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold capitalize absolute text-center bottom-4 sm:bottom-5 md:bottom-6 xl:bottom-8 inset-x-0">
              {name.length > 10 ? `${name.slice(0, 10)}...` : name}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
