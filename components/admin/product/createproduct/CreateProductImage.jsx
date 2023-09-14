import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/DialogSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PaletteIcon from "@mui/icons-material/Palette";

export default function CreateProductImage({
  images,
  setImages,
  header,
  text,
  name,
  setColorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const [meta, field] = useField(props);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (images.length === 6) {
        dispatch(
          showDialog({
            header: "Maximum 6 images are allowed.",
            msgs: [
              {
                msg: `Maximum of total six images are allowed.`,
                type: "error",
              },
            ],
          })
        );
        return;
      }
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp"
      ) {
        dispatch(
          showDialog({
            header: "Unsupported Format.",
            msgs: [
              {
                msg: `${img.name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`,
                type: "error",
              },
            ],
          })
        );
        files = files.filter((item) => item !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 10) {
        dispatch(
          showDialog({
            header: "Unsupported Format.",
            msgs: [
              {
                msg: `${img.name} size is too large, maximum of 10mb allowed.`,
                type: "error",
              },
            ],
          })
        );
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const handleRemove = (image) => {
    setImages((images) => images.filter((item) => item !== image));
  };

  return (
    <div className="images">
      <div
        className={`bg-gray-100 p-4 rounded-lg ${
          meta.error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          {meta.error && (
            <img src="../../../images/warning.png" alt="" className="w-4 h-4" />
          )}
          {header}
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className="mt-2 text-red-500">
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name={name}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />
      <div className="images__main mt-4">
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`}
        >
          {!images.length ? (
            <img
              src="../../../images/no_image.png"
              alt=""
              className="w-full h-auto"
            />
          ) : (
            images.map((img, i) => (
              <div className="relative" key={i}>
                <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-0 transition duration-300">
                  <div className="flex justify-center items-center h-full opacity-0 hover:opacity-100">
                    <IconButton onClick={() => handleRemove(img)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => setColorImage(img)}>
                      <PaletteIcon />
                    </IconButton>
                  </div>
                </div>
                <img src={img} alt="" className="w-full h-auto rounded-lg" />
              </div>
            ))
          )}
        </div>
      </div>
      <button
        type="reset"
        disabled={images.length === 6}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => fileInput.current.click()}
      >
        {text}
      </button>
    </div>
  );
}
