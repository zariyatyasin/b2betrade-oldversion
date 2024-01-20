import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import Image from "next/image";

const ProductSwiper = ({ images }) => {
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);
  return (
    <div
      className=" "
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        className="mySwiper w-full h-full "
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
      >
        {images?.map((img, id) => (
          <SwiperSlide key={id}>
            <Image
              width={500}
              height={500}
              src={img.url}
              alt=""
              className="w-full h-full object-center object-contain sm:w-full sm:h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
