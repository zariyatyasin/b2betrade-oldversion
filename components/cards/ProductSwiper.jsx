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
  const modifyImageUrl = (url) => {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const modifiedUrl =
        url.slice(0, uploadIndex + 8) +
        "f_auto,q_auto/" +
        url.slice(uploadIndex + 8);
      return modifiedUrl;
    }

    return url;
  };
  return (
    <div
      className="  "
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper?.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        className="mySwiper w-full h-32  lg:h-56 "
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
              src={modifyImageUrl(img.url)}
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
