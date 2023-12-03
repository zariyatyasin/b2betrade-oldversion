"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const ProductPageImage = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="lg:w-1/3      ">
      <div className="  x w-full max:h-[500px]    flex justify-center items-center overflow-hidden relative mb-3   ">
        <div className="      flex justify-center ">
          {images && (
            <img
              className="    w-full h-full object-contain"
              src={activeImg || images[active]?.url}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="mt-2  lg:mt-0  lg:mr-5     ">
        <div className="flex          ">
          {images?.map((img, i) => (
            // <Swiper
            //   slidesPerView={1}
            //   spaceBetween={30}
            //   loop={true}
            //   pagination={{
            //     clickable: true,
            //   }}
            //   autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            //   }}
            //   navigation={true}
            //   modules={[Pagination, Navigation, Autoplay]}
            // >
            //   (
            //   <SwiperSlide>

            //   </SwiperSlide>
            //   );
            // </Swiper>
            <div
              className={`flex-0  lg:flex-col aspect-square ml-2   h-20   ${
                i == active && "border-2 border-gray-900"
              } text-center  `}
              key={i}
              onMouseOver={() => setActive(i)}
            >
              <img
                className="h-full    w-full object-cover"
                src={img.url}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    // <div class="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
    //   <img
    //     src={activeImg || images[active].url}
    //     alt=""
    //     class="object-contain"
    //   />
    //   <div class="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
    //     <span>-50%</span>
    //   </div>
    // </div>
  );
};

export default ProductPageImage;
