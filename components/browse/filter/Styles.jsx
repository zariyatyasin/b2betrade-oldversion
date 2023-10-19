import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Style({ data, name, replaceQuery, styleHandle }) {
  const [show, setShow] = useState(true);

  const handleCheckboxChange = (size) => {
    styleHandle(size);
  };
  const toggleShow = () => {
    setShow(!show);
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
          {data?.map((style, i) => {
            const check = replaceQuery("style", style);
            return (
              <div
                className="grid grid-cols-2 gap-4"
                key={i}
                onClick={() => handleCheckboxChange(check.result)}
              >
                <div className="flex items-center mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="style"
                    id={style}
                    checked={check.active}
                    onChange={() => handleCheckboxChange(check.result)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                  />

                  <label htmlFor={style}>
                    <a className="text-sm">
                      {style.length > 12 ? style.slice(0, 10) + "..." : style}
                    </a>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
