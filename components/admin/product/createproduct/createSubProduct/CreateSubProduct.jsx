import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import {Button} from "../../../../ui/button"
import AddSubProductImage from "./AddSubProductImage";
import AddSubQty from "./AddSubQty";
import AddSubProductColor from "./AddSubProductColor";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
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
    <div className=" ">
      <h2>Add Product</h2>
      {subProducts.map((subProduct, index) => (
        <div key={index}>
          {/* <h3 onClick={() => toggleSubProductVisibility(index)} c>
            Product {index + 1}
          </h3> */}
          {/* <h3 onClick={() => toggleSubProductVisibility(index)} className="font-semibold leading-none tracking-tight">
            Product {index + 1}
          </h3> */}
          {subProductVisibility[index] && (
            <Box key={index} className="border  rounded-md shadow p-2"  >
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const updatedVisibility = [...subProductVisibility];
                  updatedVisibility[index] = !updatedVisibility[index];
                  setSubProductVisibility(updatedVisibility);
                }}
              >
                Toggle Visibility
              </Button> */}
      

<div className="   flex justify-between items-center">
<h3 className="font-semibold leading-none tracking-tight py-2"> Product {index + 1}</h3>
  <HighlightOffOutlinedIcon
    variant="contained"
    color="error"
    onClick={() => handleRemoveSubProduct(index)}
  />
            </div>
            
            <AddSubProductImage
                index={index}
                subProducts={subProducts}
                setSubProducts={setSubProducts}
              />
                <Button
                  className="flex bg-white text-gray-950 border"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddSize(index)}
                >
                  Add Size
                </Button>
          
             
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
