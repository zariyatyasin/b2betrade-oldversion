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
  const [noSize, setNoSize] = useState(false);

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
    updatedSubProducts[subProductIndex].sizes[sizeIndex].bulkPricing.splice(
      pricingIndex,
      1
    );
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
  const maxBulkPricingEntries = 4; // Set the maximum number of bulk pricing entries

  const handleAddBulkPricing = (subProductIndex, sizeIndex) => {
    const updatedSubProducts = [...subProducts];

    if (
      updatedSubProducts[subProductIndex] &&
      updatedSubProducts[subProductIndex].sizes[sizeIndex] &&
      updatedSubProducts[subProductIndex].sizes[sizeIndex].bulkPricing
    ) {
      const bulkPricingCount =
        updatedSubProducts[subProductIndex].sizes[sizeIndex].bulkPricing.length;

      if (bulkPricingCount < maxBulkPricingEntries) {
        updatedSubProducts[subProductIndex].sizes[sizeIndex].bulkPricing.push({
          minQty: 0,
          maxQty: 0,
          price: 0,
        });
        setSubProducts(updatedSubProducts);
      }
    }
  };

  return (
    <div className=" border py-8 p-4 mt-8" key={sizeIndex}>
      <div className="flex items-end justify-end ">
        <div
          className="text-white bg-blue-800 hover:bg-blue-800     text-center  cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 d"
          onClick={() => setNoSize((prev) => !prev)}
        >
          {!noSize
            ? "Click if product has size"
            : "Click if product has no size"}
        </div>
      </div>

      <h4>QTY {sizeIndex + 1}</h4>
      <div className="flex gap-4 items-center">
        {noSize && (
          <div>
            <label>Size</label>
            <Input
              type="text"
              value={size.size}
              onChange={(e) =>
                handleSizeChange(index, sizeIndex, "size", e.target.value)
              }
            />
          </div>
        )}
        <div>
          <label>Quantity</label>
          <Input
            className=""
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
          <div>
            {size.bulkPricing?.map((pricing, pricingIndex) => (
              <div key={pricingIndex}>
                <label>Bulk Pricing</label>
                <div>
                  <label>Min Qty</label>
                  <Input
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
                  <Input
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
                  <Input
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
                  className="text-white bg-red-500 hover:bg-red-500     text-center  cursor-pointer  font-medium rounded-lg text-sm  p-2"
                  onClick={() =>
                    handleRemoveBulkPricing(index, sizeIndex, pricingIndex)
                  }
                >
                  Remove Bulk Pricing
                </div>
              </div>
            ))}
            <div
              className="text-white bg-blue-800 hover:bg-blue-800   text-center  cursor-pointer  font-medium rounded-lg text-sm p-2 d"
              onClick={() => handleAddBulkPricing(index, sizeIndex)}
            >
              Add Bulk Pricing
            </div>
          </div>
        )}
      </div>

      <HighlightOffOutlinedIcon
        variant="contained"
        color="error"
        onClick={() => handleRemoveSize(index, sizeIndex)}
      />
    </div>
  );
}
