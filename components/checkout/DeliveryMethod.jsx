import React from "react";

export default function DeliveryMethod() {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">
          Delivery method
        </legend>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <label className="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none">
            <input
              type="radio"
              name="delivery-method"
              value="Standard"
              className="sr-only"
              aria-labelledby="delivery-method-0-label"
              aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
            />
            <div className="flex-1 flex">
              <div className="flex flex-col">
                <span
                  id="delivery-method-0-label"
                  className="block text-sm font-medium text-gray-900"
                >
                  {" "}
                  Standard{" "}
                </span>
                <span
                  id="delivery-method-0-description-0"
                  className="mt-1 flex items-center text-sm text-gray-500"
                >
                  {" "}
                  4–10 business days{" "}
                </span>
                <span
                  id="delivery-method-0-description-1"
                  className="mt-6 text-sm font-medium text-gray-900"
                >
                  {" "}
                  $5.00{" "}
                </span>
              </div>
            </div>

            <svg
              className="h-5 w-5 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <div
              className="absolute -inset-px rounded-lg border-2 pointer-events-none"
              aria-hidden="true"
            ></div>
          </label>

          <label className="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none">
            <input
              type="radio"
              name="delivery-method"
              value="Express"
              className="sr-only"
              aria-labelledby="delivery-method-1-label"
              aria-describedby="delivery-method-1-description-0 delivery-method-1-description-1"
            />
            <div className="flex-1 flex">
              <div className="flex flex-col">
                <span
                  id="delivery-method-1-label"
                  className="block text-sm font-medium text-gray-900"
                >
                  {" "}
                  Express{" "}
                </span>
                <span
                  id="delivery-method-1-description-0"
                  className="mt-1 flex items-center text-sm text-gray-500"
                >
                  {" "}
                  2–5 business days{" "}
                </span>
                <span
                  id="delivery-method-1-description-1"
                  className="mt-6 text-sm font-medium text-gray-900"
                >
                  {" "}
                  $16.00{" "}
                </span>
              </div>
            </div>

            <svg
              className="h-5 w-5 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <div
              className="absolute -inset-px rounded-lg border-2 pointer-events-none"
              aria-hidden="true"
            ></div>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
