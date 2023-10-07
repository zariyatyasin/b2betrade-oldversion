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
  return (
    <div>
      <div className="   gap-8 flex flex-col justify-center md:justify-normal md:flex-row   ">
        <ProductPageImage images={product?.images} activeImg={activeImg} />
        <ProductInfo
          product={product}
          setActiveImg={setActiveImg}
          params={params}
        />
        {/* <StoreSide /> */}
      </div>
      <ProductReviews product={product} />
    </div>

    // <main class="  mx-auto sm:pt-16 sm:px-6 lg:px-8">
    //   <div class="max-w-2xl mx-auto lg:max-w-none">
    //     <div class="lg:flex lg:flex-row gap-4  lg:items-start">
    //       <SideImage images={product?.images} activeImg={activeImg} />

    //       <SideProductInfo />
    //     </div>
    //     <section
    //       aria-labelledby="related-heading"
    //       class="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
    //     >
    //       <h2 id="related-heading" class="text-xl font-bold text-gray-900">
    //         Customers also bought
    //       </h2>

    //       <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
    //         <div>
    //           <div class="relative">
    //             <div class="relative w-full h-72 rounded-lg overflow-hidden">
    //               <img
    //                 src="https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg"
    //                 alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
    //                 class="w-full h-full object-center object-cover"
    //               />
    //             </div>
    //             <div class="relative mt-4">
    //               <h3 class="text-sm font-medium text-gray-900">
    //                 Zip Tote Basket
    //               </h3>
    //               <p class="mt-1 text-sm text-gray-500">White and black</p>
    //             </div>
    //             <div class="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
    //               <div
    //                 aria-hidden="true"
    //                 class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
    //               ></div>
    //               <p class="relative text-lg font-semibold text-white">$140</p>
    //             </div>
    //           </div>
    //           <div class="mt-6">
    //             <a
    //               href="#"
    //               class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
    //             >
    //               Add to bag<span class="sr-only">, Zip Tote Basket</span>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </main>
  );
};

export default ProductMain;
