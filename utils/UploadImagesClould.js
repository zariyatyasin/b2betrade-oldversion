import FormData from "form-data";
import { Uploadimages } from "../request/uploadimg";

export default async function UploadImagesClould(images) {
  const uploadedImages = [];

  for (const imageUrl of images) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      const uploadedImage = await Uploadimages(formData);
   
      uploadedImages.push(uploadedImage );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return uploadedImages;
}
