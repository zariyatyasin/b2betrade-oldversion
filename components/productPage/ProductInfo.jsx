"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Accordian from "../accordion/Accordion";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../store/cartSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
const ProductInfo = ({ product, setActiveImg, params }) => {
  const UrlSize = params?.slug[2];
  const UrlStyle = params?.slug[1];
  const { cart } = useSelector((state) => ({ ...state }));
  const [size, setSize] = useState(UrlSize);
  const [qty, setQty] = useState(1);
  const [staySize, setStaySize] = useState(
    UrlSize !== undefined ? parseInt(UrlSize) : -1
  );

  console.log(product.colors);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSize(UrlSize);
    setQty(1);
  }, [UrlStyle]);
  useEffect(() => {
    if (staySize !== -1) {
      setSize(product.size[staySize].size);
    }
  }, [staySize, product.size]);
  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [UrlSize]);

  const handleSizeSelection = (size) => {
    setSize(size.size);
    setStaySize(size.index);
  };

  const handleQtyDecrease = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleQtyIncrease = () => {
    if (qty < product.quantity) {
      setQty((prev) => prev + 1);
    }
  };

  const addToCartHandler = async () => {
    if (!UrlSize) {
      setError("Please Select a size");
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}/${UrlStyle}/${UrlSize}`
    );
    if (qty > data.quantity) {
      setError(
        "The Quantity you have choosed is more than in stock. Try and lower the Qty"
      );
    } else if (data.quantity < 1) {
      setError("This Product is out of stock.");
      return;
    } else {
      let _uid = `${data._id}_${product.style}_${UrlSize}`;
      let exist = cart.cartItems.find((p) => p._uid === _uid);

      if (exist) {
        let newCart = cart.cartItems.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(
          addToCart({
            ...data,
            qty,
            size: data.size,
            _uid,
          })
        );
      }
    }
  };

  return (
    <div className=" flex-1   ">
      <h1 className="text-xl font-semibold  text-gray-900 ">{product.name}</h1>
      <div className="mt-2 flex items-center">
        <Rating
          name="hover-feedback"
          defaultValue={product.rating}
          readOnly
          sx={{ fontSize: 24 }}
          precision={0.5}
        />
        <p className="ml-2 text-sm  font-bold text-gray-950">
          {product.numReviews} {product.numReviews > 1 ? "reviews" : "review"}
        </p>
      </div>
      <div className="flex items-end mt-4 mb-4">
        {!size ? (
          <h1 className="text-3xl font-bold text-[#ff6f61]">
            {product.priceRange}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-[#ff6f61]">
            ৳{product.price}
          </h1>
        )}
        {product.discount > 0 && size && (
          <div className="ml-2">
            <span className="text-sm line-through mr-2">
              ${product.priceBefore}
            </span>
            <span className=" text-red-500  rounded  s   ">
              {product.discount}%
            </span>
          </div>
        )}
      </div>
      <div className="mt-1 text-green-500 rounded text-sm font-semibold">
        {product.shipping ? `+${product.shipping}$ shipping` : "Free Shipping"}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {size
          ? `${product.quantity} pieces available.`
          : `Total available: ${product.size.reduce(
              (start, next) => start + next.qty,
              0
            )} pieces. `}
      </p>
      <h2 className=" mt-2 text-base text-gray-900">Select the Size</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-2">
        {product.size.map((size, i) => (
          <Link
            href={`/product/${product.slug}/${UrlStyle}/${i} `}
            key={i}
            onClick={() => setStaySize(i)}
          >
            <div
              key={i}
              className={`peer-checked:bg-black peer-checked:text-white rounded-lg border ${
                i === staySize ? "bg-black text-white" : "border-black"
              } px-6 py-2 font-bold cursor-pointer`}
              onClick={() => handleSizeSelection({ size: size.size, index: i })}
            >
              {size.size}
            </div>
          </Link>
        ))}
      </div>
      <h2 className="mt-3 text-base text-gray-900">Color</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
        {product.colors &&
          product.colors.map((color, i) => (
            <div
              onMouseOver={() =>
                setActiveImg(product.subProducts[i].images[0].url)
              }
              onMouseLeave={() => setActiveImg("")}
              key={i}
            >
              <Link href={`/product/${product.slug}/${i}`}>
                <img src={color.image} className="h-10 w-10 rounded-full" />
              </Link>
            </div>
          ))}
      </div>
      <div className="mt-3  flex select-none flex-wrap items-center gap-1">
        <div className=" bg-gray-100 h-10 p-1 rounded-lg flex flex-row   relative mt-1">
          <button
            className="inline-flex items-center px-3   border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50    "
            onClick={handleQtyDecrease}
          >
            <RemoveOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
          <div className="p-4 flex   items-center ">{qty}</div>
          <button
            className=" inline-flex items-center px-3  border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50   "
            onClick={handleQtyIncrease}
          >
            <AddOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
        <button
          disabled={product.quantity < 1}
          type="button"
          className="inline-flex items-center justify-center  border-2 border-transparent bg-gray-950 rounded-lg 0 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
          onClick={() => addToCartHandler()}
        >
          Add to cart
        </button>
        <div className="ml-6">
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 28 }} />
        </div>
      </div>
      {error && <span className=" text-red-600"> {error}</span>}
      <ul className="mt-5 flex items-center">
        {" "}
        <li className="flex items-center text-left text-sm font-medium text-gray-600">
          <svg
            className="mr-2 block h-5 w-5 align-middle text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              className=""
            ></path>
          </svg>
          Cancel Anytime
        </li>
      </ul>
      <Accordian details={[product.description, ...product.details]} />
    </div>
  );
};

export default ProductInfo;
