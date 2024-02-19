"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./styles.module.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
export default function Main({ data }) {
  const modifyImageUrl = (url) => {
    const uploadIndex = url?.indexOf("/upload/");
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
    <div className="relative   ">
      <div className="xl:flex md:pb-2.5 mb-12 lg:mb-6    ">
        <div className="w-full border border-red-50 ">
          <div className="mb-3 border border-red-50 md:mb-4 lg:mb-5 xl:mb-6">
            <div className="  mx-auto w-full   overflow-hidden">
              <div className="absolute top-1/2   w-full   transform -translate-y-1/2 text-white   z-20 user-select-none">
                <div className="  max-w-7xl mx-auto px-8   ">
                  <div className="  max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                    <div className="lg:py-24">
                      <a
                        href="#"
                        className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                      >
                        <span className="px-3 flex items-center py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-[#2B39D1] rounded-full">
                          <PlayCircleIcon sx={{ fontSize: 14 }} />{" "}
                          <span className=" ml-1">Watch</span>
                        </span>
                        <span className="ml-4 text-sm">
                          Learn about B2BeTrade
                        </span>
                      </a>
                      <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5   lg:mt-6 lg:text-4xl">
                        <span className="block">B2B Wholesale</span>
                        <p className="block">
                          Where Every Request
                          <span className=" ml-2 text-indigo-400">
                            Sparks a Bid!
                          </span>
                        </p>
                      </h1>
                      <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        চাহিদা আছে? বিড আছে! B2B হোলসেলের সেরা ডিল এখানে।আমরা
                        বিশ্বাস করি যে প্রতিটি ব্যবসা সেরা ডিল পাওয়ার যোগ্য।
                        আমাদের বিডিং সিস্টেমের মাধ্যমে, আপনি আপনার চাহিদা
                        পূরণকারী সরবরাহকারীদের সাথে সরাসরি সংযোগ স্থাপন করতে
                        পারেন
                      </p>
                      <div className="mt-10 sm:mt-12 flex gap-5">
                        <div className="flex items-center">
                          Trending Search <TrendingUpOutlinedIcon />:
                        </div>
                        <div className=" border border-white py-1 text-sm px-4 rounded-full">
                          T-shirt
                        </div>
                        <div className=" border border-white py-1 text-sm px-4  rounded-full">
                          Iphone 14 pro
                        </div>
                        <div className=" border border-white py-1 text-sm px-4 rounded-full">
                          Bottle
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r max-h-[700px] from-black to-transparent  z-10"></div>

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
                modules={[Pagination, Navigation, Autoplay]}
                className={styles.swiper}
              >
                {data.map((item, id) => {
                  if (item.active && item.heroImageSide === "none") {
                    return item.images.map((image, index) => (
                      <SwiperSlide key={`${id}-${index}`}>
                        <img
                          src={modifyImageUrl(image.url)}
                          alt={item.title}
                          className="w-full max-h-[700px] " // Adjust the class for full-width image
                        />
                      </SwiperSlide>
                    ));
                  }
                  return null;
                })}
              </Swiper>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:gap-5">
              <div className="mx-auto w-full   overflow-hidden">
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
                  modules={[Pagination, Navigation, Autoplay]}
                  className={styles.swiper}
                >
                  {data.map((item, id) => {
                    if (item.active && item.heroImageSide === "left") {
                      return item.images.map((image, index) => (
                        <SwiperSlide key={`${id}-${index}`}>
                          <img
                            src={modifyImageUrl(image.url)}
                            alt={item.title}
                            width={500}
                            height={100}
                            className="w-full h-full"
                          />
                        </SwiperSlide>
                      ));
                    }
                    return null;
                  })}
                </Swiper>
              </div>
              <div className="mx-auto hidden lg:block w-full rounded overflow-hidden">
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
                  modules={[Pagination, Navigation, Autoplay]}
                  className={styles.swiper}
                >
                  {data.map((item, id) => {
                    if (item.active && item.heroImageSide === "right") {
                      return item.images.map((image, index) => (
                        <SwiperSlide key={`${id}-${index}`}>
                          <img
                            src={modifyImageUrl(image.url)}
                            alt={item.title}
                            width={500}
                            height={250}
                            className="md:w-full md:h-full"
                          />
                        </SwiperSlide>
                      ));
                    }
                    return null;
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <section
        className="relative bg-cover bg-center bg-no-repeat  h-[300px]  md:h-[700px]"
        style={{
          backgroundImage: `url(${data[0]?.images[0]?.url})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r   from-black to-transparent   "></div>
        <div class="relative mx-auto max-w-screen-xl px-4  sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="  text-white max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="">
              <a
                href="#"
                className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
              >
                <span className="px-3 flex items-center py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-[#2B39D1] rounded-full">
                  <PlayCircleIcon sx={{ fontSize: 14 }} />{" "}
                  <span className=" ml-1">Watch</span>
                </span>
                <span className="ml-4 text-sm">Learn about B2BeTrade</span>
              </a>
              <h1 className="mt-4 text-2xl tracking-tight font-extrabold text-white sm:mt-5  lg:mt-6 lg:text-4xl">
                <span className="block">B2B Wholesale</span>
                <p className="block">
                  Where Every Request
                  <span className=" ml-2 text-indigo-400">Sparks a Bid!</span>
                </p>
              </h1>
              <p className="mt-3 text-sm   text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                চাহিদা আছে? বিড আছে! B2B হোলসেলের সেরা ডিল এখানে।আমরা বিশ্বাস
                করি যে প্রতিটি ব্যবসা সেরা ডিল পাওয়ার যোগ্য। আমাদের বিডিং
                সিস্টেমের মাধ্যমে, আপনি আপনার চাহিদা পূরণকারী সরবরাহকারীদের সাথে
                সরাসরি সংযোগ স্থাপন করতে পারেন
              </p>
         
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
