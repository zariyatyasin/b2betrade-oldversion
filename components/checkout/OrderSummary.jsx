import React, { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod";
import { applyCoupon } from "../../request/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../store/cartSlice";
import { toast } from "react-toastify";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
export default function OrderSummary({
  cart,
  setTotalAfterDiscount,
  totalAfterDiscount,
  user,
  selectedAddress,
  selectedMethod,
  setSelectedMethod,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(" ");
  const [orderError, setOrderError] = useState(" ");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {}, [totalAfterDiscount]);
  const applyCouponHandler = async () => {
    try {
      setLoading(true);

      const res = await applyCoupon(coupon);

      if (res?.message) {
        setError(res.message);
        setTotalAfterDiscount(0);
        setDiscount(0);
      } else {
        setDiscount(res.discount);
        setError("");
        setTotalAfterDiscount(res.totalAfterDiscount);
      }
    } catch (error) {
      setError("An error occurred while applying the coupon.");
    } finally {
      setLoading(false);
    }
  };

  const placeOrderHandler = async () => {
    if (selectedAddress) {
      try {
        setOrderError("");
        setLoading(true);
        const { data } = await axios.post("/api/order/create", {
          products: cart?.products,
          shippingAddress: selectedAddress,
          paymentMethod: selectedMethod,
          totalBeforeDiscount: cart?.cartTotal,
          total: totalAfterDiscount !== "" ? totalAfterDiscount : total,
          couponApplied: coupon,
        });

        router.push(`/order/${data.order_id}`);
      } catch (error) {
        setOrderError(error.response.data.message);
      } finally {
        setLoading(false);
        dispatch(emptyCart());
      }
    } else {
      toast.error("User address is empty.");
      setOrderError("User address is empty.");
    }
  };

  return (
    <div>
      {loading && <FullScreenLoading />}
      <div className="mt-10 lg:mt-0  lg:col-span-1">
        <div className="  bg-white rounded-md border border-gray-200  shadow-sm">
          <h2 className="text-2xl px-4 mt-5 font-bold text-gray-900">
            Order summary
          </h2>

          <h3 className="sr-only">Items in your cart</h3>

          <dl className="  border-gray-200 py-6 px-4 space-y-2 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Total</dt>
              <dd className="text-sm font-bold text-gray-900">
                ৳ {cart?.cartTotal.toLocaleString("en-US")}
              </dd>
            </div>
            {/* <div className="flex items-center justify-between">
              <dt className="text-sm">Coupon Discount</dt>
              <dd className="text-sm font-medium text-gray-900">
                - ৳ {discount?.toFixed(2)}
              </dd>
            </div> */}
            {/* <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">$0.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">$0.00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>

              {totalAfterDiscount < cart?.cartTotal &&
                totalAfterDiscount != "" && (
                  <span>
                    New price : <b>{totalAfterDiscount}$</b>
                  </span>
                )}
            </div> */}
          </dl>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <p className=" text-red-600 text-xs mb-2">{orderError}</p>
            {/* <div className="flex flex-col items-center   ">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="border  w-full  border-gray-300 p-2 marker:"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error}
              <div className="  w-full flex items-end justify-end">
                <button
                  type="button"
                  className="bg-[#2B39D1] w-full  mt-4 text-white p-2   "
                  onClick={() => applyCouponHandler()}
                >
                  Apply Coupon
                </button>
              </div>
              {discount > 0 && (
                <span>
                  Coupon applied : <b>-{discount}%</b>
                </span>
              )}
            </div> */}

            <button
              type="submit"
              className="w-full hidden lg:flex bg-[#2B39D1] border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-[#2B39D1] mt-4"
              onClick={() => placeOrderHandler()}
            >
              Place order
            </button>
          </div>
        </div>

        <div className="md:mt-5  z-50 p-4 flex items-center  lg:hidden   fixed bottom-0 left-0 w-full bg-white   justify-between  l   border-y-2  border-gray-200 border-2">
          <div className=" flex items-center ">
            <dd className="text-base   text-[#2B39D1] font-extrabold">
              ৳ {cart?.cartTotal.toLocaleString("en-US")}
            </dd>
          </div>

          <div className=" order-2">
            <button
              type="submit"
              className="w-full bg-[#2B39D1] border border-transparent  rounded-md  text-xs  shadow-sm py-2 px-4  font-medium text-white  "
              onClick={() => placeOrderHandler()}
            >
              Place order
            </button>
          </div>
        </div>
        <PaymentMethod
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
      </div>
    </div>
  );
}
