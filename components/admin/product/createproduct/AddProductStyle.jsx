import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function AddProductStyle({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(props);

  const handleImage = (e) => {
    let img = e.target.files[0];
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
        let obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({
          ...product,
          color: obj,
        });
      };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col items-center space-y-4">
        {meta.error && (
          <div className="text-red-500">
            <img src="../../../images/warning.png" alt="" />
            Pick a Product style image
          </div>
        )}
        <span>
          {meta.touched && meta.error && (
            <div className="text-red-500">
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImage}
      />

      <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Pick Style
      </button>
    </div>
  );
}
