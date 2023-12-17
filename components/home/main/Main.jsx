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
export default function Main() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [quary, setQuary] = useState(search);
  const handleSearch = (e) => {
    e.preventDefault();

    if (quary?.length > 1) {
      const currentSearchParams = new URLSearchParams(window.location.search);
      console.log("hewo");
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
              className="flex flex-1 items-center py-0.5"
            >
              <input
                id="top-bar-search"
                className="text-heading rounded-l-md   mb-2  overflow-hidden  p-4 border-t border-b  outline-none w-full h-11 ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px    transition-all duration-200  placeholder:text-brand-dark/50 bg-fill-one"
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
                  {[...Array(3).keys()].map((item, id) => {
                    return (
                      <SwiperSlide key={id}>
                        <img
                          src={`./image/hero/${item + 1}.jpg`}
                          key={id}
                          className="md:w-full md:h-full"
                        />
                      </SwiperSlide>
                    );
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
                  {[...Array(3).keys()].map((item, id) => {
                    return (
                      <SwiperSlide key={id}>
                        <a
                          className="h-full group flex justify-center relative overflow-hidden"
                          href="/search"
                        >
                          {/* <img
                    alt="Fresh Healthy Breakfast food"
                    width="720"
                    height="390"
                    className="bg-fill-thumbnail object-cover w-full"
                    src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-medium-1.png&w=750&q=100"
                  /> */}

                          <div className="swiper-slide py-1.5 swiper-slide-active">
                            <article
                              className="flex flex-col justify-between group cursor-pointer relative px-4 lg:px-4 "
                              title="Fog Linen Chambray Towel - Beige Stripe"
                            >
                              <div className="grid grid-cols-7 gap-2">
                                <div className="relative col-span-12 sm:col-span-3">
                                  <div className="flex justify-center overflow-hidden mx-auto relative">
                                    <div>
                                      <div>
                                        <img
                                          alt=""
                                          aria-hidden="true"
                                          src="https://razor-next.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3.jpg&w=384&q=100"
                                        />
                                      </div>
                                      {/* <img
                                alt="Fog Linen Chambray Towel - Beige Stripe"
                                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-medium-1.png&w=750&q=100"
                                className="object-cover bg-skin-thumbnail"
                              /> */}
                                      <noscript></noscript>
                                    </div>
                                  </div>
                                  <div className="w-full h-full absolute top-0 z-10 -mx-0.5 sm:-mx-1">
                                    <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                                      on sale
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 flex flex-col pb-5 lg:pb-6 mb-0.5 lg:pt-3 h-full ">
                                  <h2 className="text-skin-base text-base font-semibold mb-4">
                                    Fog Linen Chambray Towel - Beige Stripe
                                  </h2>
                                  <div className="space-s-2 mb-1 lg:mb-4">
                                    <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                                      $5.00 - $15.00
                                    </span>
                                  </div>
                                  <h2 className="text-skin-base text-opacity-60 sm:text-sm lg:text-15px mb-2">
                                    {" "}
                                    Hurry Up! Offer ends in
                                  </h2>
                                  <div className="flex  text-base xl:text-lg text-skin-base text-opacity-50 font-semibold -mx-2.5">
                                    <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
                                      02
                                    </span>
                                    :
                                    <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
                                      18
                                    </span>
                                    :
                                    <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
                                      38
                                    </span>
                                    :
                                    <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
                                      07
                                    </span>
                                  </div>
                                  <div className="w-full pt-4 lg:pt-6">
                                    <div className="relative w-full h-2.5 lg:h-3 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className="absolute border bg-yellow-500  h-full bg-skin-yellow-three bg-opacity-90 rounded-full bg-progress-striped"
                                        style={{ width: "70%" }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2.5 md:mt-3 xl:mt-2.5 2xl:mt-3.5">
                                      <div className="text-skin-base text-opacity-60 text-13px sm:text-sm lg:text-15px leading-6 md:leading-7">
                                        Sold :&nbsp;
                                        <span className="text-skin-base font-medium">
                                          54 items
                                        </span>
                                      </div>
                                      <div className="text-skin-base text-opacity-60 text-13px sm:text-sm lg:text-15px leading-6 md:leading-7">
                                        Available :&nbsp;
                                        <span className="text-skin-base font-medium">
                                          16 items
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine"></div>
                        </a>
                      </SwiperSlide>
                    );
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
