import { Box, Button, Input } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { useRef } from "react";
export default function AddSubProductColor({
  subProduct,
  subProducts,
  setSubProducts,
  index,
}) {
  const [showCOlor, setShowColor] = useState(false);
  const [isImgorCOlor, setIsImgOrCOlor] = useState();
  const fileInput = useRef(null);
  const handleRemoveColorImage = (subProductIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].color.image = "";
    setSubProducts(updatedSubProducts);
  };

  const handleColorChange = (subProductIndex, field, value) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].color[field] = value;
    setSubProducts(updatedSubProducts);
  };
  const handleColorImageChange = (subProductIndex, e) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].color.image = e.target.value;
    setSubProducts(updatedSubProducts);
  };
  const handleUploadColorImage = (subProductIndex, e) => {
    const updatedSubProducts = [...subProducts];
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const blob = reader.result; // Now, it's a Data URL
        updatedSubProducts[subProductIndex].color.image = blob;
        setSubProducts(updatedSubProducts);
      };
    }
  };
  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsImgOrCOlor((prev) => !prev)}
      >
        {!isImgorCOlor
          ? "Click if product has Color"
          : "Click if product has Image"}
      </Button>
      {isImgorCOlor ? (
        <div>
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
        </div>
      ) : (
        <div>
          <Input
            type="file"
            ref={fileInput}
            hidden
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleUploadColorImage(index, e)}
          />
          {subProduct.color.image && (
            <div>
              <img
                src={subProduct.color.image}
                alt="Color Image"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveColorImage(index)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      )}
    </Box>
  );
}
