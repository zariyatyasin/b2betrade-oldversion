import { sizesList } from "../../../../../data/sizes";
import { useState } from "react";
import {
  RemoveCircle as RemoveCircleIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material"; // Import Material-UI icons
import TextField from "@mui/material/TextField"; // Import Material-UI TextField component
import Button from "@mui/material/Button"; // Import Material-UI Button component

export default function Sizes({ sizes, product, setProduct }) {
  const [noSize, setNoSize] = useState(false);

  const handleSize = (i, e) => {
    const values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
  };

  const handleRemove = (i) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  return (
    <div>
      <div className="text-xl">Sizes / Quantity / Price</div>
      <Button
        variant="outlined"
        onClick={() => {
          if (!noSize) {
            let data = sizes.map((item) => {
              return {
                qty: item.qty,
                price: item.price,
              };
            });
            setProduct({ ...product, sizes: data });
          } else {
            let data = sizes.map((item) => {
              return {
                size: item.size || "",
                qty: item.qty,
                price: item.price,
              };
            });
            setProduct({ ...product, sizes: data });
          }
          setNoSize((prev) => !prev);
        }}
      >
        {noSize ? "Click if product has size" : "Click if product has no size"}
      </Button>
      {sizes
        ? sizes.map((size, i) => (
            <div className="mt-2" key={i}>
              <select
                name="size"
                value={noSize ? "" : size.size}
                disabled={noSize}
                style={{ display: `${noSize ? "none" : ""}` }}
                onChange={(e) => handleSize(i, e)}
              >
                <option value="">Select a size</option>
                {sizesList.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
              <TextField
                type="number"
                name="qty"
                placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                inputProps={{ min: 1 }}
                value={size.qty}
                onChange={(e) => handleSize(i, e)}
              />
              <TextField
                type="number"
                name="price"
                placeholder={noSize ? "Product Price" : "Size Price"}
                inputProps={{ min: 1 }}
                value={size.price}
                onChange={(e) => handleSize(i, e)}
              />
              {!noSize ? (
                <>
                  <RemoveCircleIcon
                    onClick={() => handleRemove(i)}
                    className="text-red-600 cursor-pointer ml-2"
                  />
                  <AddCircleIcon
                    onClick={() => {
                      setProduct({
                        ...product,
                        sizes: [
                          ...sizes,
                          {
                            size: "",
                            qty: "",
                            price: "",
                          },
                        ],
                      });
                    }}
                    className="text-green-600 cursor-pointer ml-2"
                  />
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
}
