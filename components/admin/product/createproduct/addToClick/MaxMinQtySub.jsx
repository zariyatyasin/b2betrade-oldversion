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

  const handleBulkPricingChange = (
    subProductIndex,
    bulkIndex,
    field,
    value
  ) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].bulkPricing[bulkIndex][field] = value;
    setSubProducts(updatedSubProducts);
  };

  const handleAddBulkPrice = (subProductIndex) => {
    const updatedSubProducts = [...subProducts];
    if (updatedSubProducts[subProductIndex].bulkPricing.length < 4) {
      updatedSubProducts[subProductIndex].bulkPricing.push({
        minQty: 0,
        maxQty: 0,
        price: 0,
      });
      setSubProducts(updatedSubProducts);
    }
  };

  const handleRemoveBulkPrice = (subProductIndex, bulkIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].bulkPricing.splice(bulkIndex, 1);
    setSubProducts(updatedSubProducts);
  };

  return (
    <div className=" border py-8 p-4 mt-8" key={sizeIndex}>
      <div className="flex items-end justify-end">
        <Button
          className="flex items-end justify-end bg-white text-gray-950 border"
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
            <label>Bulk Pricing</label>
            {subProducts[index]?.bulkPricing.map((bulkPrice, bulkIndex) => (
              <div key={bulkIndex}>
                <Input
                  type="number"
                  label="Min Qty"
                  value={bulkPrice.minQty}
                  onChange={(e) =>
                    handleBulkPricingChange(
                      index,
                      bulkIndex,
                      "minQty",
                      parseInt(e.target.value)
                    )
                  }
                />
                <Input
                  type="number"
                  label="Max Qty"
                  value={bulkPrice.maxQty}
                  onChange={(e) =>
                    handleBulkPricingChange(
                      index,
                      bulkIndex,
                      "maxQty",
                      parseInt(e.target.value)
                    )
                  }
                />
                <Input
                  type="number"
                  label="Price"
                  value={bulkPrice.price}
                  onChange={(e) =>
                    handleBulkPricingChange(
                      index,
                      bulkIndex,
                      "price",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <Delete
                  onClick={() => handleRemoveBulkPrice(index, bulkIndex)}
                />
              </div>
            ))}
            {subProducts[index]?.bulkPricing.length < 4 && (
              <Button
                startIcon={<Add />}
                onClick={() => handleAddBulkPrice(index)}
              >
                Add Bulk Price
              </Button>
            )}
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
