"use client";
import React, { useState } from "react";
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

  const handleSubProductChange = (index, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[index][field] = value;
    setSubProducts(updatedSubProducts);
  };

  const handleAddSubProduct = () => {
    setSubProducts([...subProducts, { sku: "", images: [], sizes: [] }]);
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
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="sub-category-label">Sub Categories</InputLabel>
        <Select
          labelId="sub-category-label"
          id="sub-categories"
          label="Sub Categories"
          multiple
          value={selectedSubCategories}
          onChange={(e) => setSelectedSubCategories(e.target.value)}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => (
                <Chip key={value} label={value} style={{ margin: 2 }} />
              ))}
            </div>
          )}
        >
          {parents.map((parent) => (
            <optgroup key={parent._id} label={parent.name}>
              {parent?.subCategories?.map((subCategory) => (
                <MenuItem key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </MenuItem>
              ))}
            </optgroup>
          ))}
        </Select>
      </FormControl>

      <div>
        <h2>Sub Products</h2>
        {subProducts.map((subProduct, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <h3>Sub Product {index + 1}</h3>
            <div>
              <label>SKU</label>
              <input
                type="text"
                value={subProduct.sku}
                onChange={(e) =>
                  handleSubProductChange(index, "sku", e.target.value)
                }
              />
            </div>
            <div>
              <Button
                className=" border"
                onClick={() => handleRemoveSubProduct(index)}
              >
                Remove Sub Product
              </Button>
              <Button className=" border" onClick={() => handleAddSize(index)}>
                Add Size
              </Button>
            </div>
            {subProduct.sizes.map((size, sizeIndex) => (
              <div
                key={sizeIndex}
                style={{
                  border: "1px solid #ccc",
                  padding: "16px",
                  marginTop: "16px",
                }}
              >
                <h4>Size {sizeIndex + 1}</h4>
                <div>
                  <label>Size</label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) =>
                      handleSizeChange(index, sizeIndex, "size", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Quantity</label>
                  <input
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
                  <input
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
                  className=" border"
                  onClick={() => handleRemoveSize(index, sizeIndex)}
                >
                  Remove Size
                </Button>
              </div>
            ))}
          </div>
        ))}
        <Button className=" border" onClick={handleAddSubProduct}>
          Add Sub Product
        </Button>
      </div>
      <Button className=" border" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
