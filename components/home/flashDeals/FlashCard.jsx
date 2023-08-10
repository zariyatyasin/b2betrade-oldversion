import React from "react";
import StarIcon from "@mui/icons-material/Star";
const FlashCard = ({ product }) => {
  return (
    <div>
      <div
        className="  overflow-hidden       flex cursor-pointer ltr:pr-0 rtl:pl-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform    bg-white"
        role="button"
        title="Blazer And A Neck Scarf"
      >
        <div className="flex   relative      overflow-hidden">
          <span>
            <span>
              <img alt="" aria-hidden="true" src={product.image} />
            </span>
          </span>
          <div className="absolute top-3.5 md:top-5 3xl:top-7 ltr:left-3.5 rtl:right-3.5 ltr:md:left-5 rtl:md:right-5 ltr:3xl:left-7 rtl:3xl:right-7 flex flex-col gap-y-1 items-start">
            <span className="bg-heading text-white text-10px md:text-xs leading-5 rounded-md inline-block bg-gray-900 px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
              <p>
                <span className="sm:hidden  text-white">-</span>{" "}
                {product.discount} %{" "}
                <span className="hidden sm:inline">OFF</span>
              </p>
            </span>
            <span className="bg-[#B26788] text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
              <p>
                New <span className="hidden sm:inline">Arrival</span>
              </p>
            </span>
          </div>
        </div>
        <div className="w-full overflow-hidden h-full flex flex-col">
          <div className="flex items-center py-2 gap-x-2">
            {/* <div className="text-[#FBD103]">
              <StarIcon sx={{}} />
            </div>

            <span className="text-xs font-semibold truncate sm:text-sm text-heading">
              4.5
            </span> */}
          </div>
          {/* <h2 className="truncate mb-1 font-semibold text-xs sm:text-sm md:text-base text-heading">
            Blazer And A Neck Scarf
          </h2>
          <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
            blue short sleeve basic midi dress featuring a crew neckline in a
            jersey fabric.
          </p> */}
          <div
            className="font-semibold mb-2 text-sm flex mt-1.5 flex flex-wrap gap-x-2 s      md:mt-2.5 2xl:mt-3
           !gap-x-0 !mt-auto text-heading"
          >
            <div className="inline-block false">
              {" "}
              USD{(product.price - product.price / product.discount).toFixed(2)}
              $
            </div>
            <del className="  font-normal text-gray-800">
              {" "}
              -USD
              {(
                product.price -
                (product.price - product.price / product.discount)
              ).toFixed(2)}
              $
            </del>
          </div>
          <div>
            <div className="relative w-full h-2   bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute bg-[#FCD364] h-full bg-heading"
                style={{ width: `${product.sold}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
