import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
export default function Card({ category, categoryHandler }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className=" flex items-center mt-2 cursor-pointer   ">
        <input
          name="filter"
          id={category._id}
          type="radio"
          className="mr-2 h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
        />
        <div className="flex  items-center   w-full justify-between">
          <label htmlFor={category._id}>
            <a className=" text-sm">{category.name}</a>
          </label>
          <span>
            {show ? (
              <RemoveIcon sx={{ fontSize: 18 }} />
            ) : (
              <AddIcon sx={{ fontSize: 18 }} />
            )}
          </span>
        </div>
      </section>
    </>
  );
}
