import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function AddressCard({
  index,
  address,
  selectedAddressIndex,
  handleEditAddress,
  changeAtiveHandler,
  handleDeleteAddress,
  setSelectedAddressIndex,
}) {
  return (
    <label
      className={`relative bg-white overflow-hidden   border rounded-lg shadow-sm p-4 flex cursor-pointer   ${
        address?.active && "border-gray-950"
      }`}
      onClick={() => changeAtiveHandler(address?._id)}
    >
      <input
        type="radio"
        name="delivery-method"
        className="sr-only"
        value="Standard"
        checked={selectedAddressIndex === index}
        onChange={() => setSelectedAddressIndex(index)}
        aria-labelledby="delivery-method-0-label"
        aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
      />
      <div className="flex-1 flex">
        <div className="flex flex-col   w-full">
          <span
            id="delivery-method-0-label"
            className="block text-sm font-medium text-gray-900"
          >
            {" "}
            {address?.city}
          </span>
          <span
            id="delivery-method-0-description-0"
            className="mt-1 flex items-center text-sm text-gray-500"
          >
            {" "}
            {address?.address1}
          </span>
          <div className="  w-full">
            <div
              id="delivery-method-0-description-1"
              className="mt-6 text-sm font-medium text-gray-900"
            >
              {" "}
              {address?.phoneNumber}
            </div>
          </div>
        </div>
      </div>

      <svg
        className={` ${
          selectedAddressIndex === index ? "block " : "hidden"
        } h-5 w-5 text-gray-900`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <div className=" absolute  flex bottom-5 right-5">
        <div
          className=" cursor-pointer"
          onClick={() => handleEditAddress(index)}
        >
          <EditOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
        <div
          className="ml-2 cursor-pointer"
          onClick={() => handleDeleteAddress(index)}
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
      </div>

      <div
        className="absolute  -inset-px rounded-lg border-2 pointer-events-none"
        aria-hidden="true"
      ></div>
    </label>
  );
}
