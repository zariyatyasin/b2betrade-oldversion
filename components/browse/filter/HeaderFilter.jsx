// components/Filter.js

import React from "react";

const HeaderFilter = ({
  onFilterChange,
  onSortChange,
  filter,
  sort,
  priceLimit,
  onPriceLimitChange,
}) => {
  return (
    <div className="p-4 bg-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <label className="mr-2">Free Shipping:</label>
          <input
            type="checkbox"
            checked={filter.freeShipping}
            onChange={() => onFilterChange("freeShipping")}
          />
        </div>
        <div>
          <label className="mr-2">Rating:</label>
          <select
            value={filter.rating}
            onChange={(e) => onFilterChange("rating", e.target.value)}
          >
            <option value="">All</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Sort By:</label>
          <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="new">New Arrivals</option>
            <option value="topReviews">Top Reviews</option>
            <option value="priceHighToLow">Price High to Low</option>
            <option value="priceLowToHigh">Price Low to High</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mr-2">Price Limit:</label>
        <input
          type="number"
          value={priceLimit}
          onChange={(e) => onPriceLimitChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HeaderFilter;
