"use client";
import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SearchIcon from "@mui/icons-material/Search";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./styles.module.css";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useRouter, useSearchParams } from "next/navigation";
export default function Main({ data }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [quary, setQuary] = useState(search);
  console.log(data);
  const image = [
    {
      imageUrl:
        "https://res.cloudinary.com/drtexlmq7/image/upload/v1705223081/rstationProduct/fg2whwxwhvuekvuh4zsu.jpg",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/drtexlmq7/image/upload/v1705223081/rstationProduct/x6qpfhbxgzal5dcujd1u.jpg",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/drtexlmq7/image/upload/v1705223080/rstationProduct/cisgenrr71mmaantzp3a.jpg",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (quary?.length > 1) {
      const currentSearchParams = new URLSearchParams(window.location.search);

      // Modify the search parameter
      router.push(`/browse?search=${quary}`);

      // Generate the new URL with the modified search parameter
      // const newURL = `${
      //   window.location.pathname
      // }?${currentSearchParams.toString()}`;

      // // Use the `router.push` function to navigate to the new URL
      // router.push(newURL, undefined, { shallow: true });
    } else {
      router.push("/browse", { shallow: true });
    }
  };
  return (
    <div className="relative  mt-5  px-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="xl:flex md:pb-2.5 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20">
        {/* side */}
        <div className="w-full trendy-main-content">
          <form
            className="relative lg:hidden flex w-full rounded-md"
            noValidate=""
            role="search"
            onSubmit={(e) => handleSearch(e)}
          >
            <label
              htmlFor="top-bar-search"
              className="flex   mb-2 flex-1 items-center py-0.5"
            >
              <input
                id="top-bar-search"
                className="text-heading rounded-l-md     overflow-hidden  p-4 border-t border-b  outline-none w-full h-11 ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px    transition-all duration-200  placeholder:text-brand-dark/50 bg-fill-one"
                placeholder="What are you looking..."
                aria-label="top-bar-search"
                name="search"
                onChange={(e) => setQuary(e.target.value)}
              />
              <button
                type=" submit"
                className=" flex items-center border rounded-r-md h-11 justify-center  w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none text-gray-500"
              >
                <SearchIcon sx={{ fontSize: 24 }} />
              </button>
            </label>
          </form>
          <div className="mb-3 md:mb-4 lg:mb-5 xl:mb-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 2xl:gap-5">
              <div className="mx-auto w-full rounded overflow-hidden">
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
                    // Check if the hero image is active and the side is left
                    if (item.active && item.heroImageSide === "left") {
                      return item.images.map((image, index) => (
                        <SwiperSlide key={`${id}-${index}`}>
                          <img
                            src={image[0].url}
                            alt={item.title}
                            className="md:w-full md:h-full"
                          />
                        </SwiperSlide>
                      ));
                    }
                    return null; // If not left, return null
                  })}
                </Swiper>
              </div>
              <div className="mx-auto w-full rounded overflow-hidden">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  navigation={true}
                  modules={[Pagination, Navigation, Autoplay]}
                  className={styles.swiper}
                >
                  {data.map((item, id) => {
                    // Check if the hero image is active and the side is right
                    if (item.active && item.heroImageSide === "right") {
                      return item.images.map((image, index) => (
                        <SwiperSlide key={`${id}-${index}`}>
                          <img
                            src={image[0].url}
                            alt={item.title}
                            className="md:w-full md:h-full"
                          />
                        </SwiperSlide>
                      ));
                    }
                    return null; // If not right, return null
                  })}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="mb-0"></div>
        </div>
      </div>
    </div>
  );
}
