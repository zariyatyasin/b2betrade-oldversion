import { Button } from "../../../../ui/button";
import React, { useEffect, useRef, useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function AddSubProductImage({
  subProducts,
  setSubProducts,
  index,
  initialImages,
}) {
  const fileInput = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleAddImage = (subProductIndex) => {
    fileInput.current.click();
  };
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const initialPreviews = initialImages.map((img) => img.url);
      setImagePreviews((prevPreviews) => {
        const updatedPreviews = [...prevPreviews];
        updatedPreviews[index] = initialPreviews;
        return updatedPreviews;
      });
    }
  }, [initialImages, index]);
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

    const currentImagesCount = subProducts[subProductIndex].images.length;
    const remainingSlots = 6 - currentImagesCount;

    if (files.length > remainingSlots) {
      alert(
        `You can only upload ${remainingSlots} more images for this sub-product.`
      );
      return;
    }

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
          updatedSubProducts[subProductIndex].images = [
            ...updatedSubProducts[subProductIndex].images,
            ...newImages.map((img) => ({ blob: img })),
          ];
          setSubProducts(updatedSubProducts);
          setImagePreviews(newPreviews);
        }
      };
    });
  };

  return (
    <div>
      <div className=" flex flex-wrap gap-4 p-2">
        {imagePreviews[index] &&
          imagePreviews[index].map((preview, imageIndex) => (
            <div key={imageIndex} className=" relative">
              <img
                src={preview}
                alt={`Image ${imageIndex}`}
                style={{ maxWidth: "130px", maxHeight: "130px" }}
              />
              <HighlightOffOutlinedIcon
                className=" absolute top-[-10px]  right-[-10px]"
                variant="contained"
                color="error"
                onClick={() => handleRemoveImage(index, imageIndex)}
              />
            </div>
          ))}
      </div>
      <div className="   flex  justify-center">
        <Button
          className="flex bg-white text-gray-950 border"
          onClick={() => handleAddImage(index)}
        >
          <CloudUploadIcon className="mr-2 text-blue-500" />
          Add Image
        </Button>
      </div>
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
