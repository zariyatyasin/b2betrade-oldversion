import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Brand({ brands, brandHandle, replaceQuery }) {
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="filter ">
      <h3 className=" text-lg font-bold flex justify-between mb-4">
        <div>Brand</div>
        <span className="ml-2" onClick={toggleShow}>
          {show ? <RemoveIcon sx={{ fontSize: 24 }} /> : <AddIcon />}
        </span>
      </h3>
      {show && (
        <div>
          {brands.map((brand, i) => {
            const check = replaceQuery("brand", brand);

            return (
              <button
                className="grid grid-cols-2 gap-4"
                key={i}
                onClick={() => brandHandle(check.result)}
              >
                {brand}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
