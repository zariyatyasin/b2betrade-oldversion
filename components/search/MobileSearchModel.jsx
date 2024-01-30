import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function MobileSearchModel({ isModalOpen, setModalOpen }) {
  const handleModalClose = () => {
    setModalOpen(false);
    setQuery("");
  };
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
  return (
    <div>
      {isModalOpen && (
        <div className="fixed   w-full  top-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white h-screen p-4 w-full  ">
            <form
              className="relative  flex w-full rounded-md"
              noValidate=""
              role="search"
              onSubmit={(e) => handleSearch(e)}
            >
              <label
                htmlFor="top-bar-search"
                className="flex   mb-2 flex-1 items-center py-0.5"
              >
                <div onClick={handleModalClose}>
                  <ArrowBackIosIcon sx={{ fontSize: 28 }} />
                </div>
                <input
                  id="top-bar-search"
                  className="text-heading   border rounded-l-md    p-4 text-sm   outline-none w-full h-11    transition-all duration-200  placeholder:text-brand-dark/50 bg-fill-one"
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
                          className="hover:cursor-pointer text-xs truncate hover:bg-gray-100"
                        >
                          {highlightMatchedText(suggestion.name, query)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
