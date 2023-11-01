import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Card({ category, categoryHandle, replaceQuery }) {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const check = replaceQuery("category", category._id);

  return (
    <>
      <div
        className="flex items-center mt-2 cursor-pointer"
        onClick={() => categoryHandle(category._id)}
      >
        <input
          type="radio"
          name="filter"
          className="mr-2 h-4 w-4"
          id={category._id}
          checked={check.active}
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
