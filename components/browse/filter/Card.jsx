import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Card({ category, categoryHandle }) {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryIdFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryIdFromUrl === category._id) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [categoryIdFromUrl, category._id]);

  const handleCategoryClick = (categoryId) => {
    categoryHandle(categoryId);
  };

  return (
    <>
      <div
        className="flex items-center mt-2 cursor-pointer"
        onClick={() => handleCategoryClick(category._id)}
      >
        <input
          name="filter"
          id={category._id}
          type="radio"
          className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
          checked={isChecked}
          onChange={(e) => {
            // Handle the change, if needed
          }}
        />
        <div className="flex items-center w-full justify-between">
          <label htmlFor={category._id}>
            <a className="text-sm">{category.name}</a>
          </label>
          <span>
            {show ? (
              <RemoveIcon sx={{ fontSize: 18 }} />
            ) : (
              <AddIcon sx={{ fontSize: 18 }} />
            )}
          </span>
        </div>
      </div>
    </>
  );
}
