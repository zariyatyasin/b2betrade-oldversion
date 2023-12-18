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
  loadin,
  setSelectedAddressIndex,
}) {
  return (
    <div
      className={`relative bg-white overflow-hidden  rounded-md  border  shadow-sm p-4 flex  mb-2 ${
        address?.active && "border-[#2B39D1]"
      }`}
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
            className="block text-sm font-bold text-gray-900"
          >
            {" "}
            {address?.fullName}
          </span>
          <span
            id="delivery-method-0-description-0"
            className="mt-1 flex items-center text-xs text-gray-500"
          >
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

      <div className="">
        <div
          className={`flex cursor-pointer  border ${
            address?.active ? "bg-[#2B39D1] " : ""
          } px-2 py-1 rounded-full  items-center`}
          onClick={() => changeAtiveHandler(address?._id)}
        >
          <span
            className={`${
              address?.active ? "text-white" : "text-gray-500"
            } mr-1 text-xs`}
          >
            {" "}
            Active
          </span>
          <svg
            className={` ${"text-gray-200"} h-4 w-4 `}
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
        </div>
      </div>
      <div className=" absolute  flex bottom-5 right-5">
        <div
          className=" cursor-pointer"
          onClick={() => handleEditAddress(index)}
        >
          <EditOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
        <div
          className="ml-2 cursor-pointer"
          onClick={() => handleDeleteAddress(address?._id)}
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
        </div>
      </div>

      <div
        className="absolute  -inset-px  border-2 pointer-events-none"
        aria-hidden="true"
      ></div>
    </div>
  );
}
