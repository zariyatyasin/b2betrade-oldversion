import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ColorExtractor } from "react-color-extractor";

export default function AddImageColor({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [field, meta] = useField(props);

  const renderSwatches = () => {
    return colors.map((color, id) => (
      <div
        className="rounded-full border p-2 m-1 cursor-pointer"
        key={id}
        style={{ backgroundColor: color }}
        onClick={() => {
          setProduct({
            ...product,
            color: { color, image: product.color.image },
          });
        }}
      >
        {color}
      </div>
    ));
  };

  return (
    <div className="my-4">
      <div className={`text-red-500 ${meta.error[name] ? "" : "hidden"}`}>
        <div className="flex items-center">
          {meta.error[name] && <img src="../../../images/warning.png" alt="" />}
          Pick a product color
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className="text-sm text-red-500">
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="text"
        value={product.color.color}
        name={name}
        hidden
        {...field}
        {...props}
      />
      <div className="my-4"></div>
      <div className={toggle ? "" : "hidden"}>
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img src={colorImage} style={{ display: "none" }} />
        </ColorExtractor>
        <div className="flex">{renderSwatches()}</div>
      </div>
      {colors.length > 0 && (
        <ArrowUpwardIcon
          className="cursor-pointer transform transition-transform"
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}
    </div>
  );
}
