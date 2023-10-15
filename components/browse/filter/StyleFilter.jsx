import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Size from "./Size";
export default function StyleFilter({ styles }) {
  const [show, setShow] = useState(true);
  return (
    <div className="filter p-4   ">
      <h3 className="text-xl font-semibold">
        Category{" "}
        <span className="ml-2">{show ? <RemoveIcon /> : <AddIcon />}</span>
      </h3>
      {show && (
        <div>
          {styles.map((styles, i) => (
            <div className=" grid grid-cols-2 gap-4  " key={i}>
              <div className=" flex items-center mt-2 cursor-pointer   ">
                <input
                  name="styles"
                  id={styles}
                  type="checkbox"
                  className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                />

                <label htmlFor={styles}>
                  <a className=" text-sm">{styles}</a>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
