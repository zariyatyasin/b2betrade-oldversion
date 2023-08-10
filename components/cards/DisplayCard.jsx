import React from "react";
import StarIcon from "@mui/icons-material/Star";

const DisplayCard = ({ product }) => {
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  const formattedDiscountedPrice = Number(discountedPrice).toFixed(2);
  const formattedOriginalPrice = Number(product.price).toFixed(2);

  return (
    <div>
      <div
        className="overflow-hidden flex cursor-pointer ltr:pr-0 rtl:pl-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform bg-white"
        role="button"
        title="Blazer And A Neck Scarf"
      >
        <div className="flex relative overflow-hidden">
          <span>
            <span>
              <img alt="" aria-hidden="true" src={product.image} />
            </span>
          </span>
          <div className="absolute top-3.5 md:top-5 3xl:top-7 ltr:left-3.5 rtl:right-3.5 ltr:md:left-5 rtl:md:right-5 ltr:3xl:left-7 rtl:3xl:right-7 flex flex-col gap-y-1 items-start">
            {hasDiscount && (
              <span className="bg-heading text-white text-10px md:text-xs leading-5 rounded-md inline-block bg-gray-900 px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                <p>
                  <span className="sm:hidden  text-white">-</span>{" "}
                  {product.discount} %{" "}
                  <span className="hidden sm:inline">OFF</span>
                </p>
              </span>
            )}
            <span className="bg-[#B26788] text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
              <p>
                New <span className="hidden sm:inline">Arrival</span>
              </p>
            </span>
          </div>
        </div>
        <div className="w-full overflow-hidden h-full flex flex-col">
          <div className="flex items-center py-2 gap-x-2"></div>

          <div className="font-semibold mb-2 text-sm flex mt-1.5 flex flex-wrap gap-x-2 s md:mt-2.5 2xl:mt-3 !gap-x-0 !mt-auto text-heading">
            {hasDiscount ? (
              <>
                <div className="inline-block false">
                  USD{formattedDiscountedPrice}$
                </div>
                <del className="font-normal text-gray-800">
                  {" "}
                  -USD{formattedOriginalPrice}$
                </del>
              </>
            ) : (
              <div className="inline-block false">
                USD{formattedOriginalPrice}$
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
