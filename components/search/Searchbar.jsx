"use client";
import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { useRouter, useSearchParams } from "next/navigation";

export const MiniSearchBar = ({ linkUrl }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [query, setQuery] = useState(search || "");

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      const currentSearchParams = new URLSearchParams(window.location.search);

      currentSearchParams.set("search", query);

      const newURL = `${
        window.location.pathname
      }?${currentSearchParams.toString()}`;

      // Use the `router.push` function to navigate to the new URL
      router.push(newURL, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch({ preventDefault: () => {} });
    }, 300); // Adjust the debounce delay as needed (e.g., 300 milliseconds)

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative  flex flex-col justify-center w-full shrink-0">
      <div className="flex flex-col w-full mx-auto">
        <form
          className="relative flex w-full rounded-md"
          noValidate=""
          role="search"
          onSubmit={(e) => handleSearch(e)}
        >
          <label
            htmlFor="top-bar-search"
            className="flex flex-1 items-center  "
          >
            <input
              id="top-bar-search"
              className="text-heading border showdow  p-6  outline-none w-full h-11    text-brand-dark text-sm lg:text-15px rounded-l-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 "
              placeholder="What are you looking..."
              aria-label="top-bar-search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="flex items-center border rounded-r-md p-6 justify-center h-11 w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none text-gray-500"
          >
            <SearchIcon sx={{ fontSize: 24 }} />
          </button>
        </form>
      </div>
    </div>
  );
};
