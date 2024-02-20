import Link from "next/link";
import React from "react";

const CategoryCard = ({ id, icon, name, slug }) => {
  return (
    <Link
      href={`/browse?category=${id}`}
      className="   bg-[#F7F8FA]  flex-col flex justify-center items-center mx-w-[100px]"
    >
      <div className=" bg-white      p-4 rounded-full">
        <img src={icon} alt={slug} className="  w-20   h-20 object-cover  " />
      </div>
      <h4 className=" text-sm      ">{name}</h4>
    </Link>
  );
};

export default CategoryCard;
