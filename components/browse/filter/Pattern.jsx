import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Pattern({ data, name, patternHandle, replaceQuery }) {
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleCheckboxChange = (pattern) => {
    const check = replaceQuery("pattern", pattern);

    patternHandle(check.result);
  };

  return (
    <div className="filter ">
      <h3 className=" text-lg font-bold flex justify-between mb-4">
        <div>Pattern</div>
        <span className="ml-2" onClick={toggleShow}>
          {show ? <RemoveIcon sx={{ fontSize: 24 }} /> : <AddIcon />}
        </span>
      </h3>
      {show && (
        <div>
          {data?.map((pattern, i) => {
            const check = replaceQuery("pattern", pattern);
            return (
              <div
                className="grid grid-cols-2 gap-4"
                key={i}
                onClick={() => handleCheckboxChange(pattern)}
              >
                <div className="flex items-center mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="style"
                    id={pattern}
                    checked={check.active}
                    onChange={() => handleCheckboxChange(pattern)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                  />

                  <label htmlFor={pattern}>
                    <a className="text-sm">
                      {pattern.length > 12
                        ? pattern.slice(0, 10) + "..."
                        : pattern}
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
