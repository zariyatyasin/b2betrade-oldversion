"use client";

import React, { useState } from "react";
import ProductPageImage from "./ProductPageImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./reviews/ProductReviews";
import StoreSide from "./StoreSide";
import SideImage from "./SideImage";
import SideProductInfo from "./SideProductInfo";
const ProductMain = ({ product, params }) => {
  const [activeImg, setActiveImg] = useState("");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  console.log(product);
  return (
    <div>
      <div className="    flex flex-col justify-center   lg:flex-row gap-4  ">
        <ProductPageImage images={product?.images} activeImg={activeImg} />
        <ProductInfo
          product={product}
          setActiveImg={setActiveImg}
          params={params}
        />
        <StoreSide store={product?.storeId} />
      </div>
      <ProductReviews product={product} />
    </div>
  );
};

export default ProductMain;
