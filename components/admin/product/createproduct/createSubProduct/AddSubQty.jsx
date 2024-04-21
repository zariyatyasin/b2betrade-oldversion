import React, { useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";
import { Delete, Add } from "@mui/icons-material";

export default function AddSubQty({
  size,
  sizeIndex,
  subProducts,
  setSubProducts,
  index,
  samePriceForAll,
}) {
  const [noSize, setNoSize] = useState(true);
  const [priceIncrease, setPriceIncrease] = useState(0);

  const handleRemoveSize = (subProductIndex, sizeIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes.splice(sizeIndex, 1);
    setSubProducts(updatedSubProducts);
  };

  const handleSizeChange = (subProductIndex, sizeIndex, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes[sizeIndex][field] = value;
    setSubProducts(updatedSubProducts);
  };

  const handleRemoveBulkPricing = (
    subProductIndex,
    sizeIndex,
    pricingIndex
  ) => {
    const updatedSubProducts = [...subProducts];
    const size = updatedSubProducts[subProductIndex].sizes[sizeIndex];

    // Remove the bulk pricing entry
    size.bulkPricing.splice(pricingIndex, 1);

    // If there are no more bulk pricing entries, remove the bulk pricing data
    if (size.bulkPricing.length === 0) {
      delete size.bulkPricing;
    }

    setSubProducts(updatedSubProducts);
  };

  const handleBulkPricingChange = (
    subProductIndex,
    sizeIndex,
    pricingIndex,
    field,
    value
  ) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes[sizeIndex].bulkPricing[
      pricingIndex
    ][field] = value;
    setSubProducts(updatedSubProducts);
  };

  const maxBulkPricingEntries = 4;

  const handleAddBulkPricing = (subProductIndex, sizeIndex) => {
    const updatedSubProducts = [...subProducts];

    if (
      updatedSubProducts[subProductIndex] &&
      updatedSubProducts[subProductIndex].sizes[sizeIndex]
    ) {
      const size = updatedSubProducts[subProductIndex].sizes[sizeIndex];

      // Ensure bulkPricing array exists, if not initialize it
      if (!size.bulkPricing) {
        size.bulkPricing = [];
      }

      const bulkPricingCount = size.bulkPricing.length;

      if (bulkPricingCount < maxBulkPricingEntries) {
        const lastPricing = size.bulkPricing[bulkPricingCount - 1];
        const minQty = lastPricing ? parseInt(lastPricing.maxQty) + 1 : 1;
        const maxQty = lastPricing
          ? minQty +
            (parseInt(lastPricing.maxQty) - parseInt(lastPricing.minQty))
          : minQty + 19;
        const newPrice = lastPricing
          ? parseInt(lastPricing.price) - priceIncrease
          : 0;

        size.bulkPricing.push({
          minQty,
          maxQty,
          price: newPrice,
        });
        setSubProducts(updatedSubProducts);
      }
    }
  };

  return (
    <div className="  border rounded-md mb-8   py-8 p-4 mt-8" key={sizeIndex}>
      <div className="flex items-end   justify-end ">
        <HighlightOffOutlinedIcon
          variant="contained"
          color="error"
          onClick={() => handleRemoveSize(index, sizeIndex)}
        />
      </div>

      <div
        className="text-white bg-blue-800 hover:bg-blue-800  inline-flex items-center     text-center  cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 d"
        onClick={() => setNoSize((prev) => !prev)}
      >
        {!noSize ? "Has Size" : "No Size"}
      </div>

      <h4>QTY {sizeIndex + 1}</h4>
      <div className="   ">
        <div className="flex gap-4 items-center">
          {noSize && (
            <div>
              <label className=" text-xs sm:text-sm">Size</label>
              <input
                className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                type="text"
                value={size.size}
                onChange={(e) =>
                  handleSizeChange(index, sizeIndex, "size", e.target.value)
                }
              />
            </div>
          )}
          <div>
            <label className=" text-xs sm:text-sm">Quantity</label>
            <input
              className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              type="number"
              value={size.qty}
              onChange={(e) =>
                handleSizeChange(
                  index,
                  sizeIndex,
                  "qty",
                  parseInt(e.target.value)
                )
              }
            />
          </div>
          {!samePriceForAll && (
            <div className=" ">
              <label className=" text-xs sm:text-sm">Increase Amount</label>
              <input
                className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                type="number"
                value={priceIncrease}
                onChange={(e) => setPriceIncrease(parseFloat(e.target.value))}
              />
            </div>
          )}
        </div>
        <div className=" mt-5">
          {!samePriceForAll && (
            <div className=" ">
              <div>
                <label>Bulk Pricing</label>
                <div className="flex flex-col  gap-4 items-start ">
                  {size.bulkPricing?.map((pricing, pricingIndex) => (
                    <div key={pricingIndex} className="flex">
                      <div>
                        <label>Min Qty</label>
                        <input
                          className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          type="number"
                          value={pricing.minQty}
                          onChange={(e) =>
                            handleBulkPricingChange(
                              index,
                              sizeIndex,
                              pricingIndex,
                              "minQty",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div>
                        <label>Max Qty</label>
                        <input
                          className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          type="number"
                          value={pricing.maxQty}
                          onChange={(e) =>
                            handleBulkPricingChange(
                              index,
                              sizeIndex,
                              pricingIndex,
                              "maxQty",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div>
                        <label>Price</label>
                        <input
                          className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          type="number"
                          value={pricing.price}
                          onChange={(e) =>
                            handleBulkPricingChange(
                              index,
                              sizeIndex,
                              pricingIndex,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div
                        className="text-white bg-red-500 hover:bg-red-500  mt-4    text-center  cursor-pointer  font-medium rounded-lg text-sm  p-2"
                        onClick={() =>
                          handleRemoveBulkPricing(
                            index,
                            sizeIndex,
                            pricingIndex
                          )
                        }
                      >
                        Remove
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="text-white inline-flex mt-4 items-center bg-blue-800 hover:bg-blue-800   text-center  cursor-pointer  font-medium rounded-lg text-sm p-2 "
                onClick={() => handleAddBulkPricing(index, sizeIndex)}
              >
                Add Bulk Pricing
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
