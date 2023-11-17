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
  function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const array = new Uint8Array(raw.length);

    for (let i = 0; i < raw.length; i++) {
      array[i] = raw.charCodeAt(i);
    }

    return new Blob([array], { type: contentType });
  }
  const handleUploadColorImage = (subProductIndex, e) => {
    let files = Array.from(e.target.files);
    const updatedSubProducts = [...subProducts];
    const newImages = [];

    files.forEach((file, i) => {
      // Check if the file type is accepted
      const acceptedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      if (acceptedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          const blob = dataURLtoBlob(reader.result);
          updatedSubProducts[subProductIndex].color.image = blob;
          newImages.push(blob);

          if (newImages.length === files.length) {
            setSubProducts(updatedSubProducts);
          }
        };
      } else {
        alert(
          `File ${file.name} has an invalid format. Only PNG, JPEG, JPG, and WebP are allowed.`
        );
      }
    });
  };

  return (
    <Box  >
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
                src={URL.createObjectURL(subProduct.color.image)}
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
