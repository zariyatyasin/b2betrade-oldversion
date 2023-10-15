import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Size from "./Size";

export default function Filters({ data, name, onFilterChange, AllHandle }) {
  const [show, setShow] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleShow = () => {
    setShow(!show);
  };

  // Define a function to handle filter selection
  const handleFilterSelection = (value) => {
    // Create a new array with the updated selections
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value)
      : [...selectedFilters, value];

    // Update the state with the new array of selections
    setSelectedFilters(updatedFilters);

    // Notify the parent component about the updated filter selections
    onFilterChange(name, updatedFilters);
  };

  return (
    <div className="filter p-4">
      <h3 className="flex justify-between w-full text-xl font-semibold">
        <div>{name}</div>
        <span className="ml-2" onClick={toggleShow}>
          {show ? <RemoveIcon /> : <AddIcon />}
        </span>
      </h3>
      {show && (
        <div>
          {data?.map((data, i) => (
            <div
              className="grid grid-cols-2 gap-4"
              key={i}
              onClick={() => AllHandle(data)}
            >
              <div className="flex items-center mt-2 cursor-pointer">
                <input
                  name={name}
                  id={data}
                  type="checkbox"
                  className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                  onChange={() => handleFilterSelection(data)}
                  checked={selectedFilters.includes(data)}
                />

                <label htmlFor={data}>
                  <a className="text-sm">
                    {data.length > 12 ? data.slice(0, 10) + "..." : data}
                  </a>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
