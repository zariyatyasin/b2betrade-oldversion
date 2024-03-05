"use client";

import React, { useEffect, useState } from "react";
import ProductPageImage from "./ProductPageImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./reviews/ProductReviews";
import StoreSide from "./StoreSide";
import SideImage from "./SideImage";
import ProductDetails from "./Details/ProductDetails";
import SideProductInfo from "./SideProductInfo";
import { useRouter } from "next/navigation";
const ProductMain = ({ product, params }) => {
  const [activeImg, setActiveImg] = useState("");
  const router = useRouter();

  // window.addEventListener("popstate", (event) => {
  //   router.push("/");
  // });
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
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductMain;
