import React, { useState } from "react";

export default function Example({ categories, subCategories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">My Store</div>
        <ul className="flex space-x-4">
          {categories.map((category) => (
            <li key={category._id}>
              <button
                className={`text-white hover:text-yellow-300 ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedCategory && (
        <div className="bg-gray-800 py-4">
          <div className="container mx-auto">
            <div className="text-xl font-semibold">
              Subcategories of {selectedCategory.name}
            </div>
            <ul className="flex space-x-4">
              {subCategories
                .filter(
                  (subcategory) =>
                    subcategory.parent._id === selectedCategory._id
                )
                .map((subcategory) => (
                  <li key={subcategory._id}>
                    <button className="text-white">{subcategory.name}</button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
