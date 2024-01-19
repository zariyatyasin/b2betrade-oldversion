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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import Accordian from "../accordion/Accordion";
import InquiryForm from "../chat/InquiryForm";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
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
  if (!product) {
    return <div>Loading...</div>;
  }

  const [loading, setLoading] = useState(false);
  const [priceRanges, setPriceRanges] = useState([]); // Initialize with an empty array
  const [selectedRange, setSelectedRange] = useState(null); // Initialize with null
  // const [priceHistory, setPriceHistory] = useState([]);
  const router = useRouter();
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const togglePriceHistory = () => {
    setShowPriceHistory(!showPriceHistory);
  };
  const hasNullPrice =
    product?.bulkPricing &&
    product?.bulkPricing.some((bulkPrice) => bulkPrice.price === null);
  const firstSizeBulkPricing = product.subProducts[0].sizes[0].bulkPricing;
  const minQty2 = product.bulkPricing[0].minQty;
  const minQty = firstSizeBulkPricing[0].minQty;

  const UrlSize = params?.slug[2];
  const UrlStyle = params?.slug[1];
  const { cart } = useSelector((state) => ({ ...state }));
  const [size, setSize] = useState(UrlSize);

  const [qty, setQty] = useState(hasNullPrice ? minQty : minQty2);
  const [maxQty, setMaxQty] = useState(qty);
  const [totalPrice, setTotalPrice] = useState(product?.price);

  const [staySize, setStaySize] = useState(
    UrlSize !== undefined ? parseInt(UrlSize) : -1
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {}, [router.asPath]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    // Find the correct price based on the selected quantity
    const selectedPriceRange = priceRanges.find(
      (range) => qty >= range.minQty && qty <= range.maxQty
    );

    if (selectedPriceRange) {
      setTotalPrice(selectedPriceRange.price * qty);
    }
  }, [qty]);
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
    { date: "2022-01-04", price: 30.0 },
    { date: "2022-01-05", price: 35.5 },
    // Add more entries as needed
  ];

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

  const handleSizeSelection = (size) => {
    setSize(size.size);
    setStaySize(size.index);

    const selectedSize = product?.size.find((s) => s.size === size.size);
    setPriceRanges(selectedSize.bulkPricing || []);
    setSelectedRange(selectedSize.bulkPricing[0] || null);
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
    if (hasNullPrice && minQty > qty) {
      toast.error(`minimum order quantity ${minQty}`);
    } else if (!hasNullPrice && minQty2 > qty) {
      toast.error(`minimum order quantity ${minQty2}`);
    } else {
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

        toast.error("Error adding to Cart");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-md ">
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

      <h2 className="mt-2 text-lg font-medium  text-gray-900">
        Select the Size
      </h2>
      <div className="mt-2 flex select-none flex-wrap items-center gap-2">
        {product.size.map((size, i) => (
          <Link
            href={`/product/${product.slug}/${UrlStyle}/${i}`}
            key={i}
            onClick={() => setStaySize(i)}
          >
            <div
              key={i}
              className={`rounded-lg border ${
                i === staySize ? "bg-[#2B39D1] text-white" : "border-black"
              }  p-2 font-medium cursor-pointer  text-sm transition-all duration-300 ease-in-out`}
              onClick={() => handleSizeSelection({ size: size.size, index: i })}
            >
              {size.size}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-2     ">
        {product.colors && product.colors.length > 0 && (
          <div className=" flex flex-col">
            <h2 className="mt-4 text-lg font-semibold text-gray-900">Color</h2>
            <div className="flex gap-2">
              {product.colors.map((color, i) => (
                <div key={i}>
                  <div
                    onMouseOver={() =>
                      setActiveImg(product.subProducts[i].images[0].url)
                    }
                    onMouseLeave={() => setActiveImg("")}
                  >
                    <Link href={`/product/${product.slug}/${i}/0`}>
                      {color.image ? (
                        <img
                          src={color.image}
                          className="h-14 w-14 rounded-full"
                        />
                      ) : (
                        <div
                          className={`h-5 w-5 rounded-full`}
                          style={{ backgroundColor: color.color }}
                        ></div>
                      )}
                    </Link>
                  </div>
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
            max={10000}
            onChange={handleQtyChange}
            className="p-4 flex items-center text-lg font-semibold"
          />

          <button
            className="inline-flex items-center px-3 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
            onClick={handleQtyIncrease}
          >
            <AddOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>

      <div className="md:mt-5 md:mb-2 z-50 p-4 sm:p-0 flex items-center sm:pt-4 sm:static fixed bottom-0 left-0 w-full bg-white   justify-between sm:justify-normal   border-t border-gray-200">
        <Link
          href={"/cart"}
          className="sm:ml-6 relative order-1 lg:hidden   sm:order-3"
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
          {cart.cartItems.length > 0 && (
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#2B39D1] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {cart.cartItems.length}
            </div>
          )}
        </Link>
        <div className="hidden lg:block sm:ml-6 order-1    sm:order-3">
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 32 }} />
        </div>
        <div className=" order-2">
          <Button
            disabled={10000 < 1}
            onClick={openModal}
            type="button"
            className="bg-white border-[#2B39D1] border text-[#2B39D1] order-2 mr-2 sm:order-2"
          >
            Send Inquiry
          </Button>
          <Button
            disabled={10000 < 1 || loading}
            type="button"
            className="bg-[#2B39D1] ease-in-out order-3 sm:order-1 hover:bg-[#2B39D1]   focus:bg-[#2B39D1] "
            onClick={() => addToCartHandler()}
          >
            {loading ? (
              <div className=" flex items-center">{"Adding to Cart..."}</div>
            ) : (
              "Add to Cart"
            )}
          </Button>
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
        <div className="fixed z-50 bottom-0 flex right-8  ">
          <div className="bg-white p-8 rounded-md   shadow-2xl  border">
            <InquiryForm onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
