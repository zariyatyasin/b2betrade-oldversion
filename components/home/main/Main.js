"use client"
import React, { useRef, useState } from 'react';
 
import { Swiper, SwiperSlide } from 'swiper/react';

 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './styles.module.css'

 
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
export default function Main ()   {
  return (
    <div className='relative  mb-12 md:mb-14 lg:mb-16  '>
       <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation,Autoplay]}
        className={styles.swiper}
      >
        {[...Array(3).keys()].map((item, id) => {
          return (
            <SwiperSlide key={id}>
              <img
                src={`./image/hero/${item + 1 + 10}.webp`}
                key={id}
                className="md:w-full md:h-full"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
 
