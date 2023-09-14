const dataURItoBlob = (dataURI) => {
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

console.log(product);
const createProduct = async () => {
  let style_img = "";
  const uploadedImages = [];
  try {
    for (const dataURI of images) {
      const blob = dataURItoBlob(dataURI);
      const formData = new FormData();
      formData.append("file", blob, "image.png");

      const response = await fetch(`/api/cloudinary`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error uploading image`);
      }

      const data = await response.json();

      uploadedImages.push(...data);
    }
    if (product.color.image) {
      let temp = dataURItoBlob(product.color.image);
      let path = "product style images";
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", temp);
      let cloudinary_style_img = await fetch(`/api/cloudinary`, {
        method: "POST",
        body: formData,
      });
      style_img = cloudinary_style_img[0].url;
    }

    const { data } = await axios.post("/api/admin/product", {
      ...product,
      images: uploadedImages,
      color: {
        image: style_img,
        color: product.color.color,
      },
    });

    console.log("this is pr", product);

    console.log(data);
  } catch (error) {
    console.error("Error creating product:", error);
  }
};
