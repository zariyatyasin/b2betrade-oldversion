"use client";

import React, { useEffect, useState } from "react";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

import DisplayCard from "../../../components/cards/DisplayCard";
import { women_dresses } from "../../../data/home";

export const SudzarSale = () => {
  return (
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {women_dresses.map((item, id) => (
          <SwiperSlide key={id} className="">
            <DisplayCard product={item} key={id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
