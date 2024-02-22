"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
export default function FindSupplier() {
  const regions = [
    {
      name: "Dhaka",
      imageUrl:
        "https://images.pexels.com/photos/11260693/pexels-photo-11260693.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Chittagong",
      imageUrl:
        "https://images.pexels.com/photos/2382896/pexels-photo-2382896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Rajshahi",
      imageUrl:
        "https://images.pexels.com/photos/13525370/pexels-photo-13525370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Khulna",
      imageUrl:
        "https://images.pexels.com/photos/18755750/pexels-photo-18755750/free-photo-of-murapara-jamidar-bari-palace-in-bangladesh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Barisal",
      imageUrl:
        "https://images.pexels.com/photos/18583290/pexels-photo-18583290/free-photo-of-traffic-on-street-under-dhaka-metro-overpass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Sylhet",
      imageUrl:
        "https://images.pexels.com/photos/122107/pexels-photo-122107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Rangpur",
      imageUrl:
        "https://images.pexels.com/photos/3013018/pexels-photo-3013018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Mymensingh",
      imageUrl:
        "https://images.pexels.com/photos/6113097/pexels-photo-6113097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Dinajpur",
      imageUrl:
        "https://images.pexels.com/photos/18583290/pexels-photo-18583290/free-photo-of-traffic-on-street-under-dhaka-metro-overpass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Jessore",
      imageUrl:
        "https://images.pexels.com/photos/3013018/pexels-photo-3013018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Comilla",
      imageUrl:
        "https://images.pexels.com/photos/18755750/pexels-photo-18755750/free-photo-of-murapara-jamidar-bari-palace-in-bangladesh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="px-2 sm:px-4  lg:px-8  mb-12 md:mb-14 lg:mb-16 max-w-7xl mx-auto ">
      <h1 className="text-lg mb-4 md:text-xl text-[#222222] lg:text-3xl tracking-wide   xl:leading-10 font-bold text-heading">
        Find suppliers by region
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {regions.map((city, id) => (
          <SwiperSlide
            key={id}
            tyle={{ backgroundColor: "transparent" }}
            className=" bg-none"
          >
            <div className="  bg-none   flex-col flex justify-center items-center mx-w-[100px]">
              <div className="     p-4 ">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="  w-16 h-16 lg:w-28   lg:h-28 rounded-full  object-cover  "
                />
              </div>
              <h4 className=" text-sm      ">{city.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
