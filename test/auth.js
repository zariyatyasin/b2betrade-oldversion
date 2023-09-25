import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input } from "@mui/material";

const CreateSubProduct = ({ subProducts, setSubProducts }) => {
  const [subProductVisibility, setSubProductVisibility] = useState([]);

  const fileInput = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showCOlor, setShowColor] = useState(false);
  const [isImgorCOlor, setIsImgOrCOlor] = useState();
  const handleAddImage = (subProductIndex) => {
    fileInput.current.click();
  };
  const handleRemoveImage = (subProductIndex, imageIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].images.splice(imageIndex, 1);
    setSubProducts(updatedSubProducts);

    const newPreviews = [...imagePreviews];
    newPreviews[subProductIndex] = newPreviews[subProductIndex] || [];
    newPreviews[subProductIndex].splice(imageIndex, 1);
    setImagePreviews(newPreviews);
  };

  const handleImages = (subProductIndex, e) => {
    let files = Array.from(e.target.files);
    const newImages = [];
    const newPreviews = [...imagePreviews];

    files.forEach((img, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => {
        const url = reader.result;
        newPreviews[subProductIndex] = newPreviews[subProductIndex] || [];
        newPreviews[subProductIndex].push(url);
        newImages.push(img);

        if (newImages.length === files.length) {
          const updatedSubProducts = [...subProducts];
          updatedSubProducts[subProductIndex].images = newImages.map((img) => ({
            blob: img,
          }));
          setSubProducts(updatedSubProducts);
          setImagePreviews(newPreviews);
        }
      };
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
              <div>
                <label>Images</label>
                {imagePreviews[index] &&
                  imagePreviews[index].map((preview, imageIndex) => (
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
