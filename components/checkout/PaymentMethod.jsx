import React, { useState } from "react";
import { paymentMethods } from "../../data/paymentMethods";

export default function PaymentMethod({ selectedMethod, setSelectedMethod }) {
  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
  };

  return (
    <div className="mt-4 py-6 px-4 sm:px-6 bg-white border border-gray-200 lg:px-8 rounded-md">
      <h2 className="text-2xl font-black text-gray-900 mb-4">Payment Method</h2>

      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="flex flex-col">
          {paymentMethods.map((method, id) => (
            <div key={id} className="flex w-full items-center">
              <label
                key={method.id}
                className={`${
                  selectedMethod === method.id
                    ? "border-gray-900 border  ring-gray-900"
                    : " "
                }  flex  items-center  w-full  p-2 mb-2 cursor-pointer transition duration-300 ease-in-out`}
              >
                <svg
                  className={`h-5 w-5 ${
                    selectedMethod === method.id
                      ? "text-gray-900"
                      : "text-gray-200"
                  }  mr-2`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                    className=" border"
                  />
                </svg>
                <img src={method.images} className=" h-8 w-8 mr-2" />
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodChange(method.id)}
                  className="sr-only"
                />
                <div className=" text-start">
                  <div className="text-sm font-medium text-gray-900">
                    {method.name}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {method.description}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
