"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./styles.module.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

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
  console.log(data);
  return (
    <div className="relative   ">
      <div className="xl:flex md:pb-2.5 mb-12 lg:mb-6    ">
        <div className="w-full trendy-main-content">
          <div className="mb-3 md:mb-4 lg:mb-5 xl:mb-6">
            <div className="mx-auto w-full   overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r max-h-[700px] from-black to-transparent z-10"></div>

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
    </div>
  );
}
