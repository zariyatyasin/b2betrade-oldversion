"use client";
import React, { useState } from "react";
import { categoriesAndSub } from "../../data/CategoriesAndSub";

const Nav = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryHover = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory on category hover
  };

  const handleSubcategoryHover = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li className="relative group">
          <div
            className="cursor-pointer"
            onMouseEnter={() => handleCategoryHover(null)}
          >
            All Categories
          </div>
          {selectedCategory === null && (
            <div className="absolute left-0 mt-2 p-2 bg-white z-30 text-black rounded shadow-lg">
              {categoriesAndSub.map((category, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
          {selectedCategory !== null && (
            <div className="absolute left-0 mt-2 p-2 bg-white z-30 text-black rounded shadow-lg">
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onMouseEnter={() => handleSubcategoryHover(subcategory)}
                >
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
