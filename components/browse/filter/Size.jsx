import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
export default function Card({ sizes }) {
  return (
    <div className=" flex items-center mt-2 cursor-pointer   ">
      <input
        name="sizes"
        id={sizes}
        type="checkbox"
        className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
      />

      <label htmlFor={sizes}>
        <a className=" text-sm">{sizes}</a>
      </label>
    </div>
  );
}
