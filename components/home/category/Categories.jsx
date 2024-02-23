"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles.module.css";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import CategoryCard from "./CategoryCard";

export const Categories = ({ Category }) => {
  return (
    <div
      className={` px-2 sm:px-4  lg:px-8  mb-12 md:mb-14 lg:mb-16 max-w-7xl mx-auto `}
    >
      <div className="flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">
          Browse Categories
        </h3>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className={styles.swiper}
      >
        {Category.map((category, id) => (
          <SwiperSlide key={id} className=" bg-none">
            <CategoryCard
              id={category._id}
              icon={category.image}
              slug={category.slug}
              name={category.name}
              key={id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
