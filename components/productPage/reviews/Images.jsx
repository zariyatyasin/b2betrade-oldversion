import { useState, useRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
export default function Images({ images, setImages, imageAllow }) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((img, i) => {
      if (images.length === imageAllow || i === imageAllow) {
        alert(`Maximum ${imageAllow} images are allowed.`);
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(img.type)) {
        setError(
          `${img.name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large, max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      setError("");
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png,image/jpeg,image/webp"
      />
      <div
        className="bg-blue-500 text-white py-2 cursor-pointer px-4 mt-4 rounded-lg hover:bg-blue-600"
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add Images
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="mt-4 flex flex-wrap">
        {images.length > 0 &&
          images.map((img, i) => (
            <div key={i} className="relative mr-4 mb-4">
              <div
                onClick={() => removeImage(img)}
                className="absolute top-0 right-0 cursor-pointer text-red-500 hover:text-red-700"
              >
                <CancelIcon />
              </div>
              <img
                src={img}
                alt=""
                className="w-32 h-32 object-cover  rounded-lg border border-gray-300"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
