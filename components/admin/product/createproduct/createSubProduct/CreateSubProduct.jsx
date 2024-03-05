import React, { useState } from "react";
import { HighlightOffOutlined as HighlightOffOutlinedIcon } from "@mui/icons-material";
import AddSubProductImage from "./AddSubProductImage";
import AddSubQty from "./AddSubQty";
import AddSubProductColor from "./AddSubProductColor";

const CreateSubProduct = ({
  subProducts,
  setSubProducts,
  samePriceForAll,
  editedProduct,
}) => {
  const [subProductVisibility, setSubProductVisibility] = useState(
    new Array(subProducts.length).fill(true)
  );

  const toggleSubProductVisibility = (index) => {
    setSubProductVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const handleAddSubProduct = () => {
    const newSubProduct = {
      images: [],
      description_images: [],
      color: { color: "", image: "" },
      sizes: [
        {
          size: "",
          qty: 0,
          bulkPricing: [
            {
              minQty: 0,
              maxQty: 0,
              price: 0,
            },
          ],
        },
      ],
      discount: 0,
      sold: 0,
    };
    setSubProductVisibility([...subProductVisibility, true]);
    setSubProducts([...subProducts, newSubProduct]);
  };

  const handleRemoveSubProduct = (index) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts.splice(index, 1);
    setSubProducts(updatedSubProducts);

    const updatedVisibility = [...subProductVisibility];
    updatedVisibility.splice(index, 1);
    setSubProductVisibility(updatedVisibility);
  };

  const handleAddSize = (subProductIndex) => {
    const updatedSubProducts = [...subProducts];
    updatedSubProducts[subProductIndex].sizes.push({
      size: "",
      qty: 0,
      bulkPricing: [
        {
          minQty: 0,
          maxQty: 0,
          price: 0,
        },
      ],
    });
    setSubProducts(updatedSubProducts);
  };

  return (
    <div className=" ">
      {subProducts.map((subProduct, index) => (
        <div key={index}>
          <div key={index} className="border p-2   rounded-md mb-5 bg-white">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold leading-none tracking-tight py-2">
                {" "}
                Product {index + 1}
              </h3>
              <HighlightOffOutlinedIcon
                variant="contained"
                color="error"
                onClick={() => handleRemoveSubProduct(index)}
              />
            </div>

            <AddSubProductImage
              index={index}
              subProducts={subProducts}
              setSubProducts={setSubProducts}
              initialImages={editedProduct?.subProducts[index]?.images}
            />

            <div
              className="text-white bg-blue-800 hover:bg-blue-800 w-36 text-center cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 d"
              onClick={() => handleAddSize(index)}
            >
              Add Size
            </div>

            {subProduct.sizes.map((size, sizeIndex) => (
              <AddSubQty
                samePriceForAll={samePriceForAll}
                key={sizeIndex}
                size={size}
                index={index}
                sizeIndex={sizeIndex}
                subProducts={subProducts}
                setSubProducts={setSubProducts}
              />
            ))}
            <AddSubProductColor
              index={index}
              subProduct={subProduct}
              subProducts={subProducts}
              setSubProducts={setSubProducts}
            />
          </div>
        </div>
      ))}
      <div
        className="text-white bg-blue-800 hover:bg-blue-800 w-36 text-center cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 d"
        onClick={handleAddSubProduct}
      >
        Add Product
      </div>
    </div>
  );
};

export default CreateSubProduct;
