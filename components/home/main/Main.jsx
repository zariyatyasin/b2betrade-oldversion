"use client";
import React, { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SearchIcon from "@mui/icons-material/Search";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./styles.module.css";
import Image from "next/image";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
export default function Main({ data }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const suggestionListRef = useRef();
  const [query, setQuery] = useState(search);
  const [suggestions, setSuggestions] = useState([]);

  const highlightMatchedText = (text, query) => {
    if (!query) return <span>{text}</span>;

    const regex = new RegExp(`(${query})`, "ig");

    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              className="text-gray-950 font-bold text-xs lg:text-base"
            >
              {part}
            </span>
          ) : (
            <span className=" text-gray-600 text-xs lg:text-base" key={index}>
              {part}
            </span>
          )
        )}
      </span>
    );
  };

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
  };
  const handleClickOutside = (event) => {
    if (
      suggestionListRef.current &&
      !suggestionListRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`/api/search/${query}`);
        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (query?.length > 1) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();

    if (query?.length > 1) {
      const currentSearchParams = new URLSearchParams(window.location.search);

      router.push(`/browse?search=${query}`);
    } else {
      router.push("/browse", { shallow: true });
    }
  };
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
    <div className="relative  mt-5  px-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="xl:flex md:pb-2.5 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20">
        {/* side */}
        <div className="w-full trendy-main-content">
          {/* <form
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type=" submit"
                className=" flex items-center border rounded-r-md h-11 justify-center  w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none text-gray-500"
              >
                <SearchIcon sx={{ fontSize: 24 }} />
              </button>
            </label>
            {suggestions.length > 0 && (
              <div
                ref={suggestionListRef}
                className="absolute top-11 z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {suggestions.length > 0 && (
                  <ul className="flex flex-col gap-y-2   select-none py-2 pl-3 pr-9">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="hover:cursor-pointer truncate hover:bg-gray-100"
                      >
                        {highlightMatchedText(suggestion.name, query)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </form> */}
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
                            src={modifyImageUrl(image[0].url)}
                            alt={item.title}
                            width={500}
                            height={100}
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
                            src={modifyImageUrl(image[0].url)}
                            alt={item.title}
                            width={500}
                            height={250}
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
