import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input } from "@mui/material";

import { SketchPicker } from "react-color";
const CreateSubProduct = ({ subProducts, setSubProducts }) => {
  const [subProductVisibility, setSubProductVisibility] = useState([]);
  const [noSize, setNoSize] = useState(false);
  const fileInput = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showCOlor, setShowColor] = useState(false);

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
    const newPreviews = []; // New
    const updateSubProductImages = (index) => {
      const updatedSubProducts = [...subProducts];
      updatedSubProducts[index].images = newImages.map((img) => ({
        blob: img,
      }));
      setSubProducts(updatedSubProducts);
    };

    files.forEach((img, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => {
        const url = reader.result; // Data URL
        newPreviews.push(url); // New
        newImages.push(img);

        if (newImages.length === files.length) {
          updateSubProductImages(subProductIndex);
          setImagePreviews(newPreviews); // Ne
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
    updatedSubProducts[subProductIndex].color[field] = value;
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
              <div>
                <label>Images</label>
                {imagePreviews.map((preview, imageIndex) => (
                  <div key={imageIndex}>
                    <img
                      src={preview}
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
                <h4>Color code</h4>
                <Button
                  sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}
                  onClick={() => setShowColor(!showCOlor)}
                >
                  add color
                </Button>
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    backgroundColor: subProduct.color.color,
                    marginTop: "10px",
                  }}
                ></div>
                {showCOlor && (
                  <div>
                    <label>Color</label>
                    <div>
                      <SketchPicker
                        color={subProduct.color.color}
                        onChangeComplete={(newColor) =>
                          handleColorChange(index, "color", newColor.hex)
                        }
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label>Image</label>

                  <Input
                    type="text"
                    value={subProduct.color.image} // Only one color
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
