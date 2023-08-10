import React from "react";

const CategoryCard = ({ icon, name, slug }) => {
  return (
    <div className=" cursor-pointer  ">
      <div className="swiper-slide">
        <div className="group flex justify-center  rounded-lg flex-col h-28 sm:h-[8.5rem] md:h-40 xl:h-[11.5rem]   bg-gray-50 hover:bg-gray-200">
          <div className="relative flex items-center mb-3.5 md:mb-4 lg:mb-5 xl:mb-2 2xl:mb-6 3xl:mb-8 lg:h-24 mx-auto">
            <img
              src={icon}
              alt={slug}
              className=" mx-auto mb-4 sm:mb-6 w-2/4 sm:w-2/3 md:w-8/12 3xl:w-full"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold capitalize absolute text-center bottom-4 sm:bottom-5 md:bottom-6 xl:bottom-8 inset-x-0">
              {name}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
