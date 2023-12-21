"use client";
import React, { useEffect, useState } from "react";
import AddressForm from "./AddressFrom";
import {
  saveAddress,
  changeActiveAddress,
  deleteAddress,
} from "../../request/user";
import { paymentMethods } from "../../data/paymentMethods";
import AddressCard from "./AddressCard";
import Address from "../Address/Address";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import FullScreenLoading from "../../loading/FullScreenLoading";
import AddIcon from "@mui/icons-material/Add";
import Steps from "../steps/Steps";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";
export default function Checkout({ cart, user }) {
  const [selectedAddress, setSelectedAddress] = useState();
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);

  return (
    <div>
      <div className="bg-gray-100">
        <main className="max-w-7xl mx-auto pt-12 pb-24  ">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            {/* <Steps /> */}

            <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="  lg:col-span-2 ">
                <Address user={user} setSelectedAddress={setSelectedAddress} />
                <div className=" py-6 px-4 sm:px-6 bg-white border border-gray-200   lg:px-8  mt-4">
                  <div className="  mt-2 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-900">
                      Order Details
                    </h2>
                    <div className="flex items-center">
                      <span className=" font-bold"> View All</span>
                      <KeyboardArrowRightOutlinedIcon />
                    </div>
                  </div>
                  <ul role="list" className=" flex gap-4">
                    {cart.products.map((item, id) => (
                      <li
                        className="flex flex-col py-5   max-w-[110px]   "
                        key={id}
                      >
                        <div className=" relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt="Front of men&#039;s Basic Tee in black."
                            className="  w-full"
                          />
                          <div className=" absolute top-0 right-0  text-white p-1 bg-black text-xs">
                            X{item.qty}
                          </div>
                        </div>

                        <div className=" ">
                          <div></div>
                          <div className="flex mt-2 items-center justify-between  ">
                            <p className=" text-gray-700 text-xs font-medium">
                              Size: {item.size}
                            </p>
                            <p className="  text-xs font-bold  ">
                              ৳ {item.price}{" "}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <h5 className=" text-xs font-bold">STANDARD SHIPPING</h5>
                    <p className=" text-xs text-gray-600 mt-1">
                      Order now for delivery between{" "}
                      <span className=" text-red-600">
                        Wednesday, Aug 23 - Friday, Aug 25{" "}
                      </span>
                      are ≤ <span className="font-bold text-black">10</span>{" "}
                      days
                    </p>
                  </div>
                </div>
                <DeliveryMethod />
              </div>

              <OrderSummary
                totalAfterDiscount={totalAfterDiscount}
                setTotalAfterDiscount={setTotalAfterDiscount}
                carts={cart}
                user={user}
                selectedAddress={selectedAddress}
                setSelectedMethod={setSelectedMethod}
                selectedMethod={selectedMethod}
              />
            </div>
          </div>{" "}
        </main>
      </div>
    </div>
  );
}
