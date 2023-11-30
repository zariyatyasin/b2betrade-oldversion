import { Box } from "@mui/material";
import React, { useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";

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

  return (
    <div className=" border py-8 p-4 mt-8" key={sizeIndex}>
      <div className="flex  items-end justify-end ">
        <Button
          className="flex  items-end justify-end bg-white text-gray-950 border"
          variant="contained"
          color="primary"
          onClick={() => setNoSize((prev) => !prev)}
        >
          {!noSize
            ? "Click if product has size"
            : "Click if product has no size"}
        </Button>
      </div>

      <h4>QTY {sizeIndex + 1}</h4>
      <div className=" flex gap-4 items-center">
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
            <label>Price</label>
            <Input
              type="number"
              value={size.price}
              onChange={(e) =>
                handleSizeChange(
                  index,
                  sizeIndex,
                  "price",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
        )}

        {/* Bulk Pricing */}
        {size.bulkPricing.map((pricing, pricingIndex) => (
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
          </div>
        ))}
      </div>

      <HighlightOffOutlinedIcon
        variant="contained"
        color="error"
        onClick={() => handleRemoveSize(index, sizeIndex)}
      />
    </div>
  );
}
