import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function HeadingFilters({
  priceHandler,
  multiPriceHandler,
  shippingHandler,
  replaceQuery,
  ratingHandler,
  sortHandler,
}) {
  const searchParams = useSearchParams();

  const [show, setShow] = useState(false);

  const sortQuery = searchParams.get("sort") || "";

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="mb-4">
        <span className="font-bold">Price :</span>
        <input
          type="number"
          placeholder="min"
          min="0"
          onChange={(e) => priceHandler(e.target.value, "min")}
          className="p-2 mx-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="max"
          min="0"
          onChange={(e) => priceHandler(e.target.value, "max")}
          className="p-2 mx-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
          checked={searchParams.get("shipping") === "0"}
          className="mr-2"
        />
        <label htmlFor="shipping" className="font-bold">
          Free Shipping
        </label>
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          name="rating"
          id="rating"
          checked={searchParams.get("rating") === "4"}
          className="mr-2"
        />
        <label htmlFor="rating" className="font-bold">
          4 stars & up
        </label>
      </div>
      <div className="mb-4">
        <span className="font-bold">Sort by</span>
        <div className="relative">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-md m-1"
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
            } absolute bg-white p-2 rounded-md shadow-md`}
          >
            {sortingOptions.map((option, i) => (
              <li key={i} onClick={() => sortHandler(option.value)}>
                <a className="cursor-pointer">
                  {sortQuery === option.value ? (
                    <b>{option.name}</b>
                  ) : (
                    option.name
                  )}
                </a>
              </li>
            ))}
          </ul>
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
