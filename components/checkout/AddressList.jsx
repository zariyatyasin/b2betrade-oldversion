import React from "react";

export default function AddressList() {
  return (
    <div>
      {addresses.length > 0 && (
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Saved Addresses</h2>
            <ul>
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className={`mb-2 ${
                    selectedAddressIndex === index
                      ? "border border-blue-500"
                      : ""
                  }`}
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAddressIndex === index}
                      onChange={() => setSelectedAddressIndex(index)}
                      className="mr-2"
                    />
                    {address}
                  </label>
                  <button
                    className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEditAddress(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteAddress(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {!showAddressForm && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowAddressForm(!showAddressForm)}
            >
              Add Address
            </button>
          )}
        </div>
      )}
    </div>
  );
}
