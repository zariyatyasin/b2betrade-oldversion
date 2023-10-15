import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const ProductSwiper = ({ images }) => {
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);
  return (
    <div
      className=" h-72"
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        className="mySwiper h-full "
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
      >
        {images?.map((img, id) => (
          <SwiperSlide key={id} className=" ">
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
