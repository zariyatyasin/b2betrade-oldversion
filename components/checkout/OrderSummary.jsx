import React, { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod";
import { applyCoupon } from "../../request/user";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  console.log(selectedMethod);
  console.log(cart.products);
  useEffect(() => {}, [totalAfterDiscount]);
  const applyCouponHandler = async () => {
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
  };

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod: selectedMethod,
        totalBeforeDiscount: cart.cartTotal,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : total,
        couponApplied: coupon,
      });

      router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrderError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="mt-10 lg:mt-0  lg:col-span-1">
        <div className="  bg-white rounded-md border border-gray-200  shadow-sm">
          <h2 className="text-2xl px-4 mt-5 font-bold text-gray-900">
            Order summary
          </h2>

          <h3 className="sr-only">Items in your cart</h3>

          <dl className="  border-gray-200 py-6 px-4 space-y-2 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                ৳ {cart.cartTotal}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Coupon Discount</dt>
              <dd className="text-sm font-medium text-gray-900">
                - ৳ {discount?.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">$0.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">$0.00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>

              {totalAfterDiscount < cart.cartTotal &&
                totalAfterDiscount != "" && (
                  <span>
                    New price : <b>{totalAfterDiscount}$</b>
                  </span>
                )}
            </div>
          </dl>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex flex-col items-center   ">
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
                  className="bg-gray-900 w-full  mt-4 text-white p-2   "
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
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-900 mt-4"
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
