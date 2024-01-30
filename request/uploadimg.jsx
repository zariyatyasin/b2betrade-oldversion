import axios from "axios";

export const Uploadimages = async (formData) => {
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dtasegoef/image/upload  ",
    formData
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
  return data;
};

// export const ResizeAndUpload = async (file) => {
//   const ext = file.name.split(".").pop().toLowerCase();
//   const allowedFileTypes = ["jpg", "jpeg", "png", "webp"];

//   if (!allowedFileTypes.includes(ext)) {
//     throw new Error(`File type not allowed: ${file.name}`);
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const resizedBuffer = await sharp(buffer)
//     .resize({ width: 800, height: 600 })
//     .toBuffer();

//   const resizedFile = new File([resizedBuffer], file.name, { type: file.type });

//   const formData = new FormData();
//   formData.append("file", resizedFile);

//   const cloudinaryResponse = await Uploadimages(formData);

//   return cloudinaryResponse.map((image) => image.url);
// };
export const ResizeAndUpload = async (file, maxWidth, maxHeight) => {
  const allowedFileTypes = ["jpg", "jpeg", "png", "webp"];
  const ext = file.name.split(".").pop().toLowerCase();

  if (!allowedFileTypes.includes(ext)) {
    throw new Error(`File type not allowed: ${file.name}`);
  }

  const image = new Image();
  const reader = new FileReader();

  const resizePromise = new Promise((resolve, reject) => {
    reader.onload = (e) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate new dimensions while maintaining aspect ratio
        let newWidth = image.width;
        let newHeight = image.height;

        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = (newWidth / image.width) * image.height;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (newHeight / image.height) * image.width;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image onto the canvas with the new dimensions
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        // Convert canvas to Blob and create a File
        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(resizedFile);
          },
          file.type,
          1 // Quality parameter (1 = maximum quality)
        );
      };

      image.src = e.target.result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });

  const resizedFile = await resizePromise;

  const formData = new FormData();
  formData.append("file", resizedFile);

  const cloudinaryResponse = await Uploadimages(formData);

  return cloudinaryResponse.map((image) => image.url);
};
