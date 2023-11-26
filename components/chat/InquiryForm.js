// InquiryForm.js
import React, { useState } from "react";

const InquiryForm = ({ onClose }) => {
  const [quantity, setQuantity] = useState(0);
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    // Handle file attachment here
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = () => {
    // Handle form submission here
    // You can send the quantity, details, and attachment to the server
    // or perform any other necessary actions
    // Close the modal after submission

    console.log("helo");
    onClose();
  };

  return (
    <div className=" relative  ">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        x
      </button>
      <div>
        <label
          htmlFor="quantity"
          className="block mb-2 text-sm font-semibold text-gray-600"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="details"
          className="block mb-2 text-sm font-semibold text-gray-600"
        >
          Detailed requirements
        </label>
        <textarea
          id="details"
          name="details"
          value={details}
          onChange={handleDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="attachment"
          className="block mb-2 text-sm font-semibold text-gray-600"
        >
          Add attachment
        </label>
        <input
          type="file"
          id="attachment"
          name="attachment"
          onChange={handleAttachmentChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="button"
        disabled={quantity < 1}
        onClick={handleSubmit}
        className="mt-4 inline-flex items-center justify-center border border-transparent border-[#2B39D1] text-[#2B39D1] rounded-md bg-none px-6 py-2 text-center text-sm uppercase font-semibold transition-all duration-300 ease-in-out mr-2"
      >
        Send Inquiry
      </button>
    </div>
  );
};

export default InquiryForm;
