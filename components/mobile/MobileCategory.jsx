import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function MobileCategory({
  category,
  subCategories,
  categoryHandle,
  subcategoryHandle,
}) {
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
    setShow(!show); // Toggle the visibility of subcategories on category click
  };

  return (
    <>
      <div
        className="flex items-center mt-2 cursor-pointer"
        onClick={() => handleCategoryClick(category._id)}
      >
        <div className="flex items-center w-full p-2 justify-between">
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
      {show && (
        <div className="">
          {subCategories
            .filter((subCategory) => subCategory.parent._id === category._id)
            .map((subCategory) => (
              <div key={subCategory._id} className="ml-4 p-2">
                <label htmlFor={subCategory._id}>
                  <a className="text-sm">{subCategory.name}</a>
                </label>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
