import { Button } from "@mui/material";
import React, { useRef, useState } from "react";

export default function AddSubProductImage({
  subProducts,
  setSubProducts,
  index,
}) {
  const fileInput = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
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
  return (
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
  );
}
