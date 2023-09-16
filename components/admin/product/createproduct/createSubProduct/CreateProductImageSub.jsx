import React, { useRef } from "react";
import { Button } from "@mui/material";

const CreateProductImageSub = ({ header, text, images, setImages }) => {
  const fileInput = useRef(null);

  const handleAddImage = () => {
    fileInput.current.click();
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    const newImages = [];
    files.forEach((img, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          setImages((images) => [...images, ...newImages]);
        }
      };
    });
  };

  return (
    <div>
      <h4>{header}</h4>
      <Button variant="contained" color="primary" onClick={handleAddImage}>
        {text}
      </Button>
      <input
        type="file"
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />
      {images &&
        images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveImage(index)}
            >
              Remove Image
            </Button>
          </div>
        ))}
    </div>
  );
};

export default CreateProductImageSub;
