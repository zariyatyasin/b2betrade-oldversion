import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Material({ data, name, materialHandle, replaceQuery }) {
  const [show, setShow] = useState(true);

  console.log(data);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleCheckboxChange = (material) => {
    const check = replaceQuery("material", material);

    materialHandle(check.result);
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
          {data?.map((material, i) => {
            const check = replaceQuery("material", material);
            return (
              <div
                className="grid grid-cols-2 gap-4"
                key={i}
                onClick={() => handleCheckboxChange(material)}
              >
                <div className="flex items-center mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="style"
                    id={material}
                    checked={check.active}
                    onChange={() => handleCheckboxChange(material)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                  />

                  <label htmlFor={material}>
                    <a className="text-sm">
                      {material.length > 12
                        ? material.slice(0, 10) + "..."
                        : material}
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
