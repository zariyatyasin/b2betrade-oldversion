"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ProductCardSwip from "../../../components/cards/ProductCardSwip";
import Link from "next/link";

const NewProducts = ({ products, name }) => {
  return (
    <div className=" px-2 sm:px-4 lg:px-8 mb-12 md:mb-14 lg:mb-16 max-w-7xl mx-auto  ">
      <div className="flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading text-gray-950">
          <div> {name}</div>
        </h3>
        <div className="  text-gray-600  hover:underline flex justify-end">
          <Link href={"/browse?sort=newest"}>View All</Link>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {products?.map((item, id) => (
          <SwiperSlide key={id} className="">
            <ProductCardSwip products={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewProducts;
