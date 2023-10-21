import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function HeadingFilters({
  priceHandler,
  shippingHandler,
  replaceQuery,
  ratingHandler,
  sortHandler,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const check = replaceQuery(
    "shipping",
    searchParams.shipping === "0" ? false : "0"
  );

  const applyPriceFilter = () => {
    // Validate the input values if needed
    if (minPrice !== "" || maxPrice !== "") {
      priceHandler(minPrice, maxPrice);
    }
  };

  const checkRating = replaceQuery("rating", "4");
  const sortQuery = searchParams.get("sort") || "";

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <div className=" lg:flex items-center gap-4">
        <button
          className="border text-sm border-gray-300 p-2 bg-gray-950 text-white rounded-3xl hover:bg-gray-100  "
          onClick={() => router.push("/browse")}
        >
          Clear All ({Array.from(searchParams).length})
        </button>
        <div className=" flex items-center space-x-2">
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            checked={searchParams.get("shipping") === "0"}
            onChange={() => shippingHandler(check.result)}
            className="w-4 h-4 text-blue-600 border border-gray-300 rounded-sm"
          />
          <label htmlFor="shipping" className="text-sm">
            Free Shipping
          </label>
        </div>

        <div className=" flex items-center space-x-2">
          <input
            type="checkbox"
            name="rating"
            id="rating"
            checked={searchParams.get("rating") === "4"}
            onChange={() => ratingHandler(checkRating.result)}
            className="w-4 h-4 text-blue-600 border border-gray-300 rounded-sm"
          />
          <label htmlFor="rating" className="text-sm">
            4 stars & up
          </label>
        </div>
      </div>
      <div className="   lg:flex justify-end  items-center gap-4">
        <div className=" flex items-center space-x-2">
          <span className="text-sm hidden lg:block">Price:</span>
          <input
            type="number"
            placeholder="min"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border w-28 text-sm border-gray-300 rounded ml-2"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="max"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border w-28 text-sm border-gray-300 rounded"
          />
          <button
            onClick={applyPriceFilter}
            className="p-2 bg-gray-900 text-white text-sm rounded hover:bg-blue-600 ml-2"
          >
            OK
          </button>
        </div>

        <div className=" ">
          <div className="relative">
            <button
              className="  border text-black text-sm p-2 px-4 rounded  m-1"
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              {sortQuery === ""
                ? "Recommend"
                : sortingOptions.find((x) => x.value === sortQuery).name}
            </button>
            <ul
              className={`transition-transform ${
                show ? "scale-100" : "scale-0"
              } absolute bg-white p-2 rounded-md shadow-md z-50`}
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              {sortingOptions.map((option, i) => (
                <li
                  key={i}
                  onClick={() => sortHandler(option.value)}
                  className="p-2 hover:bg-slate-100 cursor-pointer"
                >
                  <a>
                    {sortQuery === option.value ? option.name : option.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const sortingOptions = [
  {
    name: "Recommend",
    value: "",
  },
  {
    name: "Most Popular",
    value: "popular",
  },
  {
    name: "New Arrivals",
    value: "newest",
  },
  {
    name: "Top Selling",
    value: "topSelling",
  },
  {
    name: "Top Reviewed",
    value: "topReviewed",
  },
  {
    name: "Price (low to high)",
    value: "priceLowToHigh",
  },
  {
    name: "Price (high to low)",
    value: "priceHighToLow",
  },
];
