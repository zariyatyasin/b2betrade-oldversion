import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Size from "./Size";
export default function SizeFilter({ sizes }) {
  const [show, setShow] = useState(true);
  return (
    <div className="filter p-4   ">
      <h3 className="text-xl font-semibold">
        Size <span className="ml-2">{show ? <RemoveIcon /> : <AddIcon />}</span>
      </h3>
      {show && (
        <div>
          {sizes.map((sizes, i) => (
            <div className=" grid grid-cols-2 gap-4  " key={i}>
              <Size sizes={sizes} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
