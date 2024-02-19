"use client";

import React, { useState, useEffect } from "react";

import Rating from "@mui/material/Rating";
import axios from "axios";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import InquiryForm from "../chat/InquiryForm";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../store/cartSlice";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "../ui/button";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductInfo = ({ product, setActiveImg, params }) => {
  const UrlSize = params?.slug[2] || 0;
  const UrlStyle = params?.slug[1] || 0;
  const hasNullPrice =
    product?.bulkPricing &&
    product?.bulkPricing.some((bulkPrice) => bulkPrice.price === null);
  const firstSizeBulkPricing = product.subProducts[0].sizes[0].bulkPricing;
  const minQty2 = product.bulkPricing[0].minQty;
  const minQty = firstSizeBulkPricing[0].minQty;

  const pathname = usePathname();
  const match = pathname.match(/\/product\/\w+\/(\d+)/);
  const stringAfterId = match ? match[1] : null;

  const [loading, setLoading] = useState(false);
  const [priceRanges, setPriceRanges] = useState([]); // Initialize with an empty array
  const [selectedRange, setSelectedRange] = useState(null); // Initialize with null
  // const [priceHistory, setPriceHistory] = useState([]);
  const router = useRouter();
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  const { cart } = useSelector((state) => ({ ...state }));
  const [size, setSize] = useState(UrlSize);

  const [qty, setQty] = useState(hasNullPrice ? minQty : minQty2);

  const [totalPrice, setTotalPrice] = useState(product?.price);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [staySize, setStaySize] = useState(
    UrlSize !== undefined ? parseInt(UrlSize) : -1
  );

  useEffect(() => {}, [router.asPath]);
  useEffect(() => {
    // Check if router.events is available before subscribing
    if (router.events) {
      const handleRouteChange = (url) => {
        window.history.replaceState(null, null, url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);
  useEffect(() => {
    // Find the correct price based on the selected quantity
    const selectedPriceRange = priceRanges.find(
      (range) => qty >= range.minQty && qty <= range.maxQty
    );

    if (selectedPriceRange) {
      setTotalPrice(selectedPriceRange.price * qty);
    }
  }, [qty]);
  useEffect(() => {
    if (!hasNullPrice) {
      setPriceRanges(product?.bulkPricing || []);
      setSelectedRange(product?.bulkPricing[0] || null);
      setQty(product?.bulkPricing[0].minQty);
    } else {
      const selectedSize = product?.size.find((s) => s.size === size);
      if (selectedSize) {
        setPriceRanges(selectedSize.bulkPricing || []);
        setSelectedRange(selectedSize.bulkPricing[0] || null);
        setQty(selectedSize.bulkPricing[0].minQty);
      }
    }
  }, [size, hasNullPrice, product?.size, product?.bulkPricing]);
  useEffect(() => {
    if (selectedRange) {
      setTotalPrice(selectedRange.price * qty);
    }
  }, [qty, selectedRange]);

  useEffect(() => {
    setSize(UrlSize);
    setQty(1);
  }, [UrlStyle]);
  useEffect(() => {
    if (staySize !== -1) {
      setSize(product?.size[staySize].size);
    }
  }, [staySize, product?.size]);
  useEffect(() => {
    if (qty > product?.quantity) {
      setQty(product?.quantity);
    }
  }, [UrlSize]);

  if (!product) {
    return (
      <div>
        <FullScreenLoading />
      </div>
    );
  }

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const trimmedPrice = parseFloat(formattedPrice).toFixed(0);
    return trimmedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const togglePriceHistory = () => {
    setShowPriceHistory(!showPriceHistory);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleQtyChange = (e) => {
    const newQty = Number(e.target.value.replace(/^0+/, ""));

    const selectedPriceRange = priceRanges.find(
      (range) => newQty >= range.minQty && newQty <= range.maxQty
    );

    if (selectedPriceRange) {
      setQty(newQty);
      setTotalPrice(selectedPriceRange.price * newQty);
      setSelectedRange(selectedPriceRange);
    } else {
      const closestRange = priceRanges.reduce((closest, range) => {
        const currentDiff = Math.abs(newQty - closest.minQty);
        const newDiff = Math.abs(newQty - range.minQty);
        return newDiff < currentDiff ? range : closest;
      });

      setQty(newQty);
      setTotalPrice(closestRange.price * newQty);
      setSelectedRange(closestRange);
    }
  };
  const priceHistory = [
    { date: "2022-01-01", price: 25.0 },
    { date: "2022-01-02", price: 28.5 },
    { date: "2022-01-03", price: 22.0 },
    { date: "2022-01-04", price: 20.0 },
    { date: "2022-01-05", price: 15.5 },
    // Add more entries as needed
  ];

  const handleSizeSelection = (selectedSize) => {
    if (selectedSize.size !== size) {
      // Check if the selected size is different
      setSize(selectedSize.size);
      setStaySize(selectedSize.index);

      const selectedSizeData = product?.size.find(
        (s) => s.size === selectedSize.size
      );
      setPriceRanges(selectedSizeData.bulkPricing || []);
      setSelectedRange(selectedSizeData.bulkPricing[0] || null);
      setQty(selectedSizeData.bulkPricing[0].minQty);
    }
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);

    setQty(range.minQty);

    setTotalPrice(range.price * range.minQty);
  };

  const handleQtyDecrease = () => {
    if (qty > 1) {
      const newQty = qty - 1;

      // Find the price range for the new quantity
      const selectedPriceRange = priceRanges.find(
        (range) => newQty >= range.minQty && newQty <= range.maxQty
      );

      // If a valid price range is found, update the state
      if (selectedPriceRange) {
        setQty(newQty);
        setTotalPrice(selectedPriceRange.price * newQty);
        setSelectedRange(selectedPriceRange);
      }
    }
  };

  const handleQtyIncrease = () => {
    if (qty < product?.quantity) {
      const newQty = Math.min(qty + 1, product?.quantity); // Ensure qty doesn't exceed 10000
      setQty(newQty);

      const selectedPriceRange = priceRanges.find(
        (range) => newQty >= range.minQty && newQty <= range.maxQty
      );

      if (selectedPriceRange) {
        setTotalPrice(selectedPriceRange.price * newQty);
        setSelectedRange(selectedPriceRange);
      }
    }
  };

  const addToCartHandler = async () => {
    // if (hasNullPrice && minQty > qty) {
    //   toast.error(`minimum order quantity ${minQty}`);
    // } else if (!hasNullPrice && minQty2 > qty) {
    //   toast.error(`minimum order quantity ${minQty2}`);
    // } else {
    if (!UrlSize) {
      setError("Please Select a size");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/product/${product._id}/${UrlStyle}/${UrlSize}`
      );

      if (qty > data.quantity) {
        setError(
          "The Quantity you have chosen is more than in stock. Try and lower the Qty"
        );
      } else if (data.quantity < 1) {
        setError("This Product is out of stock.");
        return;
      } else {
        let _uid = `${data._id}_${product.style}_${UrlSize}`;
        let exist = cart.cartItems.find((p) => p._uid === _uid);

        const productToAdd = {
          ...data,
          qty,
          size: data.size,
          _uid,
          storeId: product.storeId,
          price: selectedRange.price, // Include the selected price in the product data
        };

        if (exist) {
          let newCart = cart.cartItems.map((p) => {
            if (p._uid === exist._uid) {
              return { ...p, qty, price: selectedRange.price }; // Update the price in existing item
            }
            return p;
          });

          dispatch(updateCart(newCart));
          toast.success("Cart Updated");
        } else {
          dispatch(addToCart(productToAdd));
          toast.success("Product Added to Cart");
        }
      }
    } catch (error) {
      // Handle errors

      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-md relative  shadow ">
      <h1 className="text-xl   font-medium text-qblack mb-2 ">
        {product?.name}
      </h1>
      <div className="  flex items-center">
        <Rating
          name="hover-feedback"
          defaultValue={product.rating}
          readOnly
          sx={{ fontSize: 18 }}
          precision={0.5}
        />
        <p className="ml-2 text-sm font-medium text-gray-600">
          {product.numReviews} {product.numReviews > 1 ? "reviews" : "review"}
        </p>
      </div>
      {/* <p className="mt-2 text-sm text-gray-600">
        {size
          ? `${product.quantity} pieces available.`
          : `Total available: ${product.size.reduce(
              (start, next) => start + next.qty,
              0
            )} pieces.`}
      </p> */}
      <div className="flex items-end mt-2">
        <div className="flex mt-2 flex-wrap gap-2 md:gap-0">
          {priceRanges.map((range, index) => (
            <div
              key={index}
              onClick={() => handleRangeSelect(range)}
              className={`border hover:bg-[#2B39D1] rounded-md  hover:text-white p-2 font-medium cursor-pointer ${
                range === selectedRange
                  ? "bg-[#2B39D1] text-white"
                  : "border-[#2B39D1]"
              }`}
            >
              <div className="text-center justify-between items-center p-2 px-2">
                <div className=" text-xs lg:text-sm text-gray-600d">{`${range.minQty} - ${range.maxQty}`}</div>
                <div className="text-xs lg:text-sm font-bold">
                  ৳{range.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {product.size &&
        product.size.some((size) => size.size && size.size.trim() !== "") && (
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Select option
          </h2>
        )}
      <div className="mt-2 flex select-none flex-wrap items-center gap-2">
        {product.size &&
          product.size.length > 0 &&
          product.size
            .filter((size) => size.size && size.size.trim() !== "")
            .map((size, i) => (
              <Link
                href={`/product/${product._id}/${UrlStyle}/${i}`}
                key={i}
                onClick={() => setStaySize(i)}
                scroll={false}
              >
                <div
                  key={i}
                  className={`rounded-lg border ${
                    i === staySize ? "bg-[#2B39D1] text-white" : "border-black"
                  }  p-2 font-medium cursor-pointer  text-sm transition-all duration-300 ease-in-out`}
                  onClick={() =>
                    handleSizeSelection({ size: size.size, index: i })
                  }
                >
                  {size.size}
                </div>
              </Link>
            ))}
      </div>

      <div className="mt-2     ">
        {product.colors &&
          product.colors.some(
            (color) => color.color !== "" || color.image !== ""
          ) && (
            <div className="flex flex-col">
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                Color
              </h2>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <div key={i}>
                    {color.color !== "" || color.image !== "" ? (
                      <div
                        onMouseOver={() =>
                          setActiveImg(product.subProducts[i].images[0].url)
                        }
                        onMouseLeave={() => setActiveImg("")}
                      >
                        {console.log(
                          "mew",
                          product.subProducts[i].images[0].url
                        )}
                        <Link
                          href={`/product/${product._id}/${i}/0`}
                          scroll={false}
                        >
                          {color.image ? (
                            <img
                              src={color.image}
                              className={`${
                                i === parseInt(UrlStyle)
                                  ? "border-2 border-[#2B39D1] "
                                  : "border "
                              } h-14 w-14  rounded-full`}
                            />
                          ) : (
                            <div
                              className={`h-5 w-5 rounded-full`}
                              style={{ backgroundColor: color.color }}
                            ></div>
                          )}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      <div className="text-2xl font-bold mt-4 text-[#2B39D1]">
        Total Price: ৳{formatPrice(totalPrice)}
      </div>
      <div className="mt-2 flex select-none flex-wrap items-center gap-2">
        <div className="bg-gray-100 h-10 p-1 rounded-lg flex flex-row relative mt-1">
          <button
            className="inline-flex items-center px-3 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
            onClick={handleQtyDecrease}
          >
            <RemoveOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
          <input
            type="number"
            value={qty.toString() > 10000 ? 10000 : qty.toString()}
            min={qty}
            max={100}
            onChange={handleQtyChange}
            disabled
            className="p-4 flex items-cente  text-lg font-semibold"
          />

          <button
            className="inline-flex items-center px-3 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
            onClick={handleQtyIncrease}
          >
            <AddOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>

      <div className="md:mt-5 md:mb-2 z-30 p-4 sm:p-0 flex items-center sm:pt-4 sm:static fixed bottom-0 left-0 w-full bg-white   justify-between   border-t border-gray-200">
        {/* <Link
          href={"/cart"}
          className="sm:ml-6 relative order-1 lg:hidden   sm:order-3"
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
          {cart.cartItems.length > 0 && (
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#2B39D1] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {cart.cartItems.length}
            </div>
          )}
        </Link> */}
        {/* <Link
          href={`/store/${product?.storeId._id}`}
          className="sm:ml-6 relative order-1 lg:hidden   sm:order-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-[#2B39D1]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
        </Link> */}

        <div className="text-xl font-bold  text-[#2B39D1] sm:ml-6 relative    sm:hidden    ">
          ৳{formatPrice(totalPrice)}
        </div>

        <div className="  flex items-center">
          <Button
            disabled={10000 < 1}
            onClick={openModal}
            type="button"
            className="bg-white border-[#2B39D1]  rounded-full text-xs border text-[#2B39D1]   mr-2  "
          >
            Send Inquiry
          </Button>
          <Button
            disabled={10000 < 1 || loading}
            type="button"
            className="bg-[#2B39D1] ease-in-out text-xs order-3 rounded-full   hover:bg-[#2B39D1]   focus:bg-[#2B39D1] "
            onClick={() => addToCartHandler()}
          >
            {loading ? (
              <div className=" flex items-center">{"Adding to Cart..."}</div>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
        <div className="hidden lg:block sm:ml-6     ">
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 32 }} />
        </div>
      </div>

      {priceHistory.length > 0 && (
        <div className="mt-4    w-full">
          <div className=" flex w-full">
            <h2 className="text-lg font-semibold text-gray-900">
              Price History
            </h2>
            <button
              className="ml-2 focus:outline-none"
              onClick={togglePriceHistory}
            >
              <KeyboardArrowDownIcon />
            </button>
          </div>
          {showPriceHistory && (
            <Line
              data={{
                labels: priceHistory.map((entry) => entry.date),
                datasets: [
                  {
                    data: priceHistory.map((entry) => entry.price),
                    borderColor: "#2B39D1",
                    borderWidth: 2,
                    fill: false,
                  },
                ],
              }}
              ptions={{
                scales: {
                  x: {
                    type: "linear",
                    position: "bottom",
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    type: "linear",
                    position: "left",
                    title: {
                      display: true,
                      text: "Price",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      )}

      {error && <span className="text-red-600 mt-2">{error}</span>}

      {isModalOpen && (
        <div className="fixed z-50 bottom-0 left-1/2 md:left-auto md:right-0    transform -translate-x-1/2 md:translate-x-0   bg-white p-8 rounded-md w-full md:w-1/2 shadow-2xl border">
          <InquiryForm
            name={product.storeId.storeName}
            onClose={closeModal}
            productId={product._id}
            storeId={product.storeId._id}
          />
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
