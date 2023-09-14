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

export default function CreateProduct({ parents, categories }) {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subProducts, setSubProducts] = useState([]);
  const [subProductVisibility, setSubProductVisibility] = useState([]);
  const handleSubProductChange = (index, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[index][field] = value;
    setSubProducts(updatedSubProducts);
  };

  useEffect(() => {
    const initialVisibility = subProducts.map(() => true);
    setSubProductVisibility(initialVisibility);
  }, [subProducts]);

  const handleAddSubProduct = () => {
    console.log(subProducts);

    setSubProducts([
      ...subProducts,
      {
        sku: "",
        images: [],
        description_images: [],
        colors: [],
        sizes: [],
        discount: 0,
        sold: 0,
      },
    ]);
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

  const handleColorChange = (subProductIndex, colorIndex, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].colors[colorIndex][field] = value;
    setSubProducts(updatedSubProducts);
  };

  const handleAddColor = (subProductIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].colors.push({ color: "", image: "" });
    setSubProducts(updatedSubProducts);
  };

  const handleRemoveColor = (subProductIndex, colorIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].colors.splice(colorIndex, 1);
    setSubProducts(updatedSubProducts);
  };

  const handleSubmit = () => {
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

      <div>
        <h2>Sub Products</h2>
        {subProducts.map((subProduct, index) => (
          <div key={index}>
            <h3
              onClick={() => {
                const updatedVisibility = [...subProductVisibility];
                updatedVisibility[index] = !updatedVisibility[index];
                setSubProductVisibility(updatedVisibility);
              }}
            >
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
                  <label>SKU</label>
                  <Input
                    type="text"
                    value={subProduct.sku}
                    onChange={(e) =>
                      handleSubProductChange(index, "sku", e.target.value)
                    }
                  />
                </div>
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
                    Add Size
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddColor(index)}
                  >
                    Add Color
                  </Button>
                </div>
                {subProduct.sizes.map((size, sizeIndex) => (
                  <Box
                    key={sizeIndex}
                    sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}
                  >
                    <h4>Size {sizeIndex + 1}</h4>
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
                {subProduct.colors.map((color, colorIndex) => (
                  <Box
                    key={colorIndex}
                    sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}
                  >
                    <h4>Color {colorIndex + 1}</h4>
                    <div>
                      <label>Color</label>
                      <Input
                        type="text"
                        value={color.color}
                        onChange={(e) =>
                          handleColorChange(
                            index,
                            colorIndex,
                            "color",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label>Image</label>
                      <Input
                        type="text"
                        value={color.image}
                        onChange={(e) =>
                          handleColorChange(
                            index,
                            colorIndex,
                            "image",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveColor(index, colorIndex)}
                    >
                      Remove Color
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSubProduct}
        >
          Add Sub Product
        </Button>
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
