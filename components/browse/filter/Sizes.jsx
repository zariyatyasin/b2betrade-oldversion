import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Size({ data, name, sizeHandle, replaceQuery }) {
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleCheckboxChange = (size) => {
    const check = replaceQuery("size", size);

    sizeHandle(check.result);
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
          {data?.map((size, i) => {
            const check = replaceQuery("size", size);
            return (
              <div
                className="grid grid-cols-2 gap-4"
                key={i}
                onClick={() => handleCheckboxChange(size)}
              >
                <div className="flex items-center mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="style"
                    id={size}
                    checked={check.active}
                    onChange={() => handleCheckboxChange(size)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                  />

                  <label htmlFor={size}>
                    <a className="text-sm">
                      {size.length > 12 ? size.slice(0, 10) + "..." : size}
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
