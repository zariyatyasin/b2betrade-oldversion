import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Card from "./Card";

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandle,
  checkChecked,
  subcategoryHandle,
}) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="filter      ">
      <h3 className=" text-lg font-bold flex justify-between mb-4">
        <div>Category</div>
        <span className="ml-2" onClick={toggleShow}>
          {show ? <RemoveIcon sx={{ fontSize: 24 }} /> : <AddIcon />}
        </span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card
            subcategoryHandle={subcategoryHandle}
            checkChecked={checkChecked}
            key={i}
            category={category}
            subCategories={subCategories}
            categoryHandle={categoryHandle}
          />
        ))}
    </div>
  );
}
