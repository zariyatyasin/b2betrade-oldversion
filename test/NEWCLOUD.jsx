"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Chip,
} from "@mui/material";
import CreateSubProduct from "./createSubProduct/CreateSubProduct";
import { Uploadimages } from "../../../../request/uploadimg";

export default function CreateProduct({ parents, categories }) {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subProducts, setSubProducts] = useState([]);

  const handleSubmit = async () => {
    console.log({
      productName,
      selectedCategory,
      selectedSubCategories,
      subProducts,
    });
    try {
      const formData = new FormData();
      subProducts.forEach((subProduct) => {
        subProduct.images.forEach((file) => {
          formData.append("file", file.blob);
        });
      });
      console.log("Updated Sub Products with Cloudinary Images:", formData);
      const cloudinaryResponse = await Uploadimages(formData);

      const cloudinaryImages = cloudinaryResponse.map((response) => ({
        url: response.secure_url,
        secure_url: response.secure_url,
        public_id: response.public_id,
      }));

      const updatedSubProducts = subProducts.map((subProduct) => {
        const updatedImages = subProduct.images.concat(cloudinaryImages);

        console.log("this upimage", updatedImages);
        return { ...subProduct, images: updatedImages };
      });

      console.log(
        "Updated Sub Products with Cloudinary Images:",
        updatedSubProducts
      );
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
    }

    // Reset subProducts state
    setSubProducts([]);
    console.log({
      productName,
      selectedCategory,
      selectedSubCategories,
      subProducts,
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <h1>Create Product</h1>
      <TextField
        label="Product Name"
        fullWidth
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CreateSubProduct
        setSubProducts={setSubProducts}
        subProducts={subProducts}
        setImages={setImages}
        images={images}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
////




import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input } from "@mui/material";
import { Uploadimages } from "../../../../../request/uploadimg";
const CreateSubProduct = ({ subProducts, setSubProducts }) => {
  const [subProductVisibility, setSubProductVisibility] = useState([]);
  const [noSize, setNoSize] = useState(false);
  const fileInput = useRef(null);

  const handleAddImage = (subProductIndex) => {
    fileInput.current.click();
  };

  const handleRemoveImage = (subProductIndex, imageIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].images.splice(imageIndex, 1);
    setSubProducts(updatedSubProducts);
  };

  const handleImages = (subProductIndex, e) => {
    let files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((img, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => {
        const url = reader.result; // Data URL

        newImages.push({ blob: img, url });

        if (newImages.length === files.length) {
          const updatedSubProducts = [...subProducts];
          updatedSubProducts[subProductIndex].images.push(...newImages);
          setSubProducts(updatedSubProducts);
        }
      };
    });
  };

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
      colors: [{ color: "", image: "" }],
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
  const handleSizeChange = (subProductIndex, sizeIndex, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes[sizeIndex][field] = value;
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

  const handleRemoveSize = (subProductIndex, sizeIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes.splice(sizeIndex, 1);
    setSubProducts(updatedSubProducts);
  };

  const handleColorChange = (subProductIndex, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].colors[0][field] = value; // Only one color
    setSubProducts(updatedSubProducts);
  };

  return (
    <div>
      <h2>Sub Products</h2>
      {subProducts.map((subProduct, index) => (
        <div key={index}>
          <h3 onClick={() => toggleSubProductVisibility(index)}>
            Sub Product {index + 1}
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
              <h3>Sub Product {index + 1}</h3>

              <div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveSubProduct(index)}
                >
                  Remove Sub Product
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddSize(index)}
                >
                  Add Quantity
                </Button>
              </div>
              <div>
                <label>Images</label>
                {subProduct.images.map((image, imageIndex) => (
                  <div key={imageIndex}>
                    <img
                      src={image.url}
                      alt={`Image ${imageIndex}`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveImage(index, imageIndex)}
                    >
                      Remove Image
                    </Button>
                  </div>
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddImage(index)}
                >
                  Add Image
                </Button>
                <input
                  type="file"
                  ref={fileInput}
                  hidden
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleImages(index, e)}
                />
              </div>
              {subProduct.sizes.map((size, sizeIndex) => (
                <Box
                  key={sizeIndex}
                  sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setNoSize((prev) => !prev)}
                  >
                    {!noSize
                      ? "Click if product has size"
                      : "Click if product has no size"}
                  </Button>
                  <h4>QTY {sizeIndex + 1}</h4>
                  {noSize && (
                    <div>
                      <label>Size</label>

                      <Input
                        type="text"
                        value={size.size}
                        onChange={(e) =>
                          handleSizeChange(
                            index,
                            sizeIndex,
                            "size",
                            e.target.value
                          )
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
                        handleSizeChange(
                          index,
                          sizeIndex,
                          "qty",
                          parseInt(e.target.value)
                        )
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
              ))}
              <Box sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}>
                <h4>Color</h4>
                <div>
                  <label>Color</label>
                  <Input
                    type="text"
                    value={subProduct.colors[0].color} // Only one color
                    onChange={(e) =>
                      handleColorChange(index, "color", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Image</label>

                  <Input
                    type="text"
                    value={subProduct.colors[0].image} // Only one color
                    onChange={(e) =>
                      handleColorChange(index, "image", e.target.value)
                    }
                  />
                </div>
              </Box>
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
