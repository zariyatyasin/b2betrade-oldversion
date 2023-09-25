import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import AddSubProductImage from "./AddSubProductImage";
import AddSubQty from "./AddSubQty";
import AddSubProductColor from "./AddSubProductColor";

const CreateSubProduct = ({ subProducts, setSubProducts }) => {
  const [subProductVisibility, setSubProductVisibility] = useState([]);

  const toggleSubProductVisibility = (index) => {
    setSubProductVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const handleAddSubProduct = () => {
    const newSubProduct = {
      images: [],
      description_images: [],
      color: { color: "", image: "" },
      sizes: [],
      discount: 0,
      sold: 0,
    };
    setSubProductVisibility((prevVisibility) =>
      prevVisibility.map(() => false)
    );

    setSubProducts([...subProducts, newSubProduct]);
    setSubProductVisibility([...subProductVisibility, true]);
  };

  const handleRemoveSubProduct = (index) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts.splice(index, 1);
    setSubProducts(updatedSubProducts);
  };

  const handleAddSize = (subProductIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes.push({
      size: "",
      qty: 0,
      price: 0,
    });
    setSubProducts(updatedSubProducts);
  };

  return (
    <div>
      <h2>Add Product</h2>
      {subProducts.map((subProduct, index) => (
        <div key={index}>
          <h3 onClick={() => toggleSubProductVisibility(index)}>
            Product {index + 1}
          </h3>
          {subProductVisibility[index] && (
            <Box key={index} sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const updatedVisibility = [...subProductVisibility];
                  updatedVisibility[index] = !updatedVisibility[index];
                  setSubProductVisibility(updatedVisibility);
                }}
              >
                Toggle Visibility
              </Button>
              <h3> Product {index + 1}</h3>

              <div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveSubProduct(index)}
                >
                  Remove Product
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddSize(index)}
                >
                  Add Quantity
                </Button>
              </div>
              <AddSubProductImage
                index={index}
                subProducts={subProducts}
                setSubProducts={setSubProducts}
              />
              {subProduct.sizes.map((size, sizeIndex) => (
                <AddSubQty
                  key={sizeIndex}
                  size={size}
                  index={index}
                  sizeIndex={sizeIndex}
                  subProducts={subProducts}
                  setSubProducts={setSubProducts}
                />
              ))}
              <AddSubProductColor
                index={index}
                subProduct={subProduct}
                subProducts={subProducts}
                setSubProducts={setSubProducts}
              />
            </Box>
          )}
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddSubProduct}>
        Add Sub Product
      </Button>
    </div>
  );
};

export default CreateSubProduct;
