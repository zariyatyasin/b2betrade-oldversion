import Link from "next/link";
import React from "react";

const CategoryCard = ({ id, icon, name, slug }) => {
  return (
    <Link
      href={`/browse?category=${id}`}
      className="   bg-[#F7F8FA]  flex-col flex justify-center items-center mx-w-[100px]"
    >
      <div className=" bg-white      p-4 rounded-full">
        <img
          src={icon}
          alt={slug}
          className=" w-10 h-10  lg:w-20   lg:h-20 object-cover  "
        />
      </div>
      <h4 className=" text-xs lg:text-sm mt-2      ">
        {name.length > 20 ? `${name.substring(0, 20)}...` : name}
      </h4>
    </Link>
  );
};

export default CategoryCard;
