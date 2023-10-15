import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Size from "./Size";
export default function Brand({ brands }) {
  const [show, setShow] = useState(true);
  return (
    <div className="filter p-4   ">
      <h3 className="text-xl font-semibold">
        Category{" "}
        <span className="ml-2">{show ? <RemoveIcon /> : <AddIcon />}</span>
      </h3>
      {show && (
        <div>
          {brands.map((brand, i) => (
            <button className=" grid grid-cols-2 gap-4 " key={i}>
              {brand}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
