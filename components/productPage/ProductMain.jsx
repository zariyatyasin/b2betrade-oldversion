"use client";

import React, { useState } from "react";
import ProductPageImage from "./ProductPageImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";

const ProductMain = ({ product, params }) => {
  const [activeImg, setActiveImg] = useState("");
  return (
    <div className="     grid grid-cols-1  gap-8   lg:grid-cols-5  ">
      <ProductPageImage images={product?.images} activeImg={activeImg} />
      <ProductInfo
        product={product}
        setActiveImg={setActiveImg}
        params={params}
      />
      <ProductReviews />
    </div>
  );
};

export default ProductMain;
