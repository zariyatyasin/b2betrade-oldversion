import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 z-10 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
