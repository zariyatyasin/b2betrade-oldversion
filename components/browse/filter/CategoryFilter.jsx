import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Card from "./Card";

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandle,
  checkChecked,
}) {
  const [show, setShow] = useState(true);

  return (
    <div className="filter p-4   ">
      <h3 className="text-xl font-semibold">
        Category{" "}
        <span className="ml-2">{show ? <RemoveIcon /> : <AddIcon />}</span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card
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
