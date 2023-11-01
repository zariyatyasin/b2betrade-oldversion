import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Card from "./Card";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandle,
  checkChecked,
  replaceQuery,
}) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="filter     pb-4  ">
      <h3 className=" text-sm font-medium   flex justify-between mb-4">
        <div>Category</div>
        <span className="ml-2" onClick={toggleShow}>
          {show ? (
            <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 24 }} />
          ) : (
            <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 24 }} />
          )}
        </span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card
            checkChecked={checkChecked}
            key={i}
            category={category}
            replaceQuery={replaceQuery}
            subCategories={subCategories}
            categoryHandle={categoryHandle}
          />
        ))}
    </div>
  );
}
