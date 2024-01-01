"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, removeFromCart } from "../../store/cartSlice";
const CartProduct = ({
  product,
  selected,
  setSelected,
  handleQuantityChange,
}) => {
  const [active, setActive] = useState();

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    setActive(selected.some((p) => p._uid === product._uid));
  }, [selected, product]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));

  const updateQty = (type) => {
    let newCart = cart.cartItems.map((p) => {
      if (p._uid == product._uid) {
        const newQuantity = type === "plus" ? product.qty + 1 : product.qty - 1;
        if (newQuantity >= 1) {
          handleQuantityChange(product._uid, newQuantity);
        }
        return {
          ...p,
          qty: newQuantity,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));
  };

  const removeProduct = (id) => {
    dispatch(removeFromCart(id));
    setSelected([]);
  };

  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._uid !== product._uid));
      setActive(false);
    } else {
      setSelected([...selected, product]);
      setActive(true);
    }
  };

  return (
    <li className="flex  py-6 sm:py-10 bg-white md:px-4 px-2">
      <div
        className={`h-4 w-4 mr-2 md:mr-4 border border-gray-950 hover:border-2  rounded-full cursor-pointer ${
          active ? styles.cartCheckActive : ""
        }  `}
        onClick={() => handleSelect()}
      ></div>
      <div className="flex-shrink-0">
        <img
          src={product.images[0].url}
          alt="Front of men&#039;s Basic Tee in sienna."
          className="w-24   h-auto  object-center object-cover  "
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="md:text-sm text-xs">
                <a
                  href="#"
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {" "}
                  {product.name.length > 30
                    ? `${product.name.substring(0, 30)}`
                    : product.name}
                </a>
              </h3>
            </div>
            {/* <div className="mt-1 flex text-sm">
              <p className="text-gray-500">Sienna</p>

              <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                Large
              </p>
            </div> */}
            <div className="flex md:flex-row flex-col md:items-center mt-4 lg:mt-8">
              <div className="flex md:mb-0 mb-2">
                {product.color.image !== "" ? (
                  <img
                    src={product.color.image}
                    alt="color"
                    className="md:h-5 md:w-5 h-4 w-4 rounded-full"
                  />
                ) : (
                  product.color.color !== "" && (
                    <div
                      className="md:h-5 md:w-5 h-4 w-4 rounded-full"
                      style={{ backgroundColor: product.color.color }}
                    ></div>
                  )
                )}
                {product.size !== "" && (
                  <p className="ml-2 text-xs md:text-sm font-medium text-gray-900">
                    {product.size}
                  </p>
                )}
              </div>

              {product.priceBefore !== undefined &&
                product.price !== product.priceBefore && (
                  <p className="md:ml-1 mt-2 text-xs line-through text-gray-900 font-medium">
                    ৳ {product.priceBefore.toFixed(2)}
                  </p>
                )}
              {/* {product.discount > 0 && (
                <p className=" ml-1 text-xs line-through  text-green-500 font-medium ">
                  -{product.discount}%
                </p>
              )} */}
            </div>
            <div className="mt-2 text-green-500 text-xs">
              {product.shipping
                ? `+ ৳ ${product.shipping} Shipping fee`
                : "Free Shipping"}
            </div>

            {product.quantity < 1 && (
              <div className="mt-2 text-red-500 text-xs">Out Of Stock</div>
            )}
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9  ">
            {/* <div className="group border w-28 flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 h-8 md:h-9 shadow-navigation bg-heading">
              <button
                className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300  bg-gray-50 border-r  focus:outline-none w-8 md:w-9 text-gray-900 bg-heading hover:bg-gray-200  "
                disabled={product.qty < 2}
                onClick={() => updateQty("minus")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10px"
                  height="2px"
                  viewBox="0 0 12 1.5"
                >
                  <rect
                    data-name="Rectangle 970"
                    width="10px"
                    height="2px"
                    fill="currentColor"
                  ></rect>
                </svg>
              </button>
              <span className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-sm text-gray-900 w-8 md:w-10 ">
                {product.qty}
              </span>
              <button
                className="flex items-center justify-center h-full flex-shrink-0 bg-gray-50 border-l transition ease-in-out duration-300 focus:outline-none w-8 md:w-9 text-gray-900 bg-heading hover:bg-gray-200  "
                disabled={product.qty == product.quantity}
                onClick={() => updateQty("plus")}
              >
                <svg
                  data-name="plus (2)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10px"
                  height="10px"
                  viewBox="0 0 12 12"
                >
                  <g data-name="Group 5367">
                    <path
                      data-name="Path 17138"
                      d="M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </button>
            </div> */}

            <div className=" hidden md:block absolute top-0 right-0">
              {product.price && (
                <p className=" ml-2 text-sm  text-orange-600 font-bold">
                  ৳ {formatPrice(product.price * product.qty)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-900 space-x-2">
          <div className="flex">
            <button
              type="button"
              className="-m-2 p-2 inline-flex text-gray-900 hover:text-red-700 hover:font-bold "
              onClick={() => removeProduct(product._uid)}
            >
              <span className="sr-only">Remove</span>

              <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              <p className="ml-1 hidden md:block">Remoe item</p>
            </button>
          </div>
          <div className="ml-4 flex items-center">
            <button
              type="button"
              className="-m-2 p-2 inline-flex text-gray-900 hover:font-bold  "
            >
              <span className="sr-only">Remove</span>

              <FavoriteBorderOutlinedIcon sx={{ fontSize: 18 }} />
              <p className="ml-1 hidden md:block">Save for later</p>
            </button>
            <span></span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
