import { Box, Button, Input } from "@mui/material";
import React, { useState } from "react";

export default function AddSubQty({
  size,
  sizeIndex,
  subProducts,
  setSubProducts,
  index,
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

  return (
    <Box key={sizeIndex} sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setNoSize((prev) => !prev)}
      >
        {!noSize ? "Click if product has size" : "Click if product has no size"}
      </Button>
      <h4>QTY {sizeIndex + 1}</h4>
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
          type="number"
          value={size.qty}
          onChange={(e) =>
            handleSizeChange(index, sizeIndex, "qty", parseInt(e.target.value))
          }
        />
      </div>
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
      <Button
        variant="contained"
        color="error"
        onClick={() => handleRemoveSize(index, sizeIndex)}
      >
        Remove Size
      </Button>
    </Box>
  );
}
