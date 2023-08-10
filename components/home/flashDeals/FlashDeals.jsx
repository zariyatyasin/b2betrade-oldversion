"use client";

import React, { useEffect, useState } from "react";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { flashDealsArray } from "../../../data/home";
import FlashCard from "./FlashCard";
const FlashDeals = () => {
  // Set the target date for the countdown (e.g., 1st January 2024)
  const targetDate = new Date("2023-08-01T00:00:00");

  // State variables to hold the countdown values
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      // Get the current date
      const now = new Date();

      // Calculate the time remaining between now and the target date
      const timeRemaining = targetDate - now;

      // Calculate the remaining days, hours, minutes, and seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Update the state variables with the new countdown values
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdownInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={` px-2 sm:px-4 lg:px-8 mb-12 md:mb-14 lg:mb-16`}>
      <div className="flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">
          <span>Flash Deals</span> <BoltOutlinedIcon />
        </h3>
        <div>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col bg-neutral  rounded-box text-neutral-content text-sm rounded text-gray-900">
              <span className="countdown font-mono text-xl rounded bg-[#212121] p-2  text-white">
                <span>{days}</span>
              </span>
              days
            </div>
            <div className="flex flex-col bg-neutral  rounded-box text-neutral-content text-sm rounded text-gray-900">
              <span className="countdown font-mono text-xl rounded bg-[#212121] p-2  text-white">
                <span>{hours}</span>
              </span>
              hours
            </div>
            <div className="flex flex-col bg-neutral  rounded-box text-neutral-content text-sm rounded text-gray-900">
              <span className="countdown font-mono text-xl rounded bg-[#212121] p-2  text-white">
                <span>{minutes}</span>
              </span>
              min
            </div>
            <div className="flex flex-col bg-neutral  rounded-box text-neutral-content text-sm rounded text-gray-900">
              <span className="countdown font-mono text-xl rounded bg-[#212121] p-2  text-white">
                <span>{seconds}</span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>

      <div>
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 4,
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
          className={`${styles.swiper} mySwiper`}
        >
          {flashDealsArray.map((item, id) => (
            <SwiperSlide key={id} className="">
              <FlashCard product={item} key={id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FlashDeals;
