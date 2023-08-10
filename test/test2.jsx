"use client";
import React, { useEffect, useState } from "react";
import AddressForm from "./AddressFrom";

export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editedAddressIndex, setEditedAddressIndex] = useState(null);
  useEffect(() => {
    setShowAddressForm(addresses.length === 0);
  }, [addresses]);
  const handleSaveAddress = (address) => {
    if (editedAddressIndex !== null) {
      // Edit existing address
      const updatedAddresses = [...addresses];
      updatedAddresses[editedAddressIndex] = address;
      setAddresses(updatedAddresses);
      setEditedAddressIndex(null);
    } else {
      // Add new address
      setAddresses([...addresses, address]);
    }
    setShowAddressForm(false);

    // Reset form fields after saving
    setStreet("");
    setCity("");
    setState("");
    setPostalCode("");
  };

  const handleEditAddress = (index) => {
    const addressToEdit = addresses[index];
    const addressParts = addressToEdit.split(", ");
    const [street, city, state, postalCode] = addressParts; // Extract parts

    setStreet(street);
    setCity(city);
    setState(state);
    setPostalCode(postalCode);

    setEditedAddressIndex(index);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    setShowAddressForm(updatedAddresses.length === 0);
  };

  // Initialize address data for editing
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <div>
      <div className="bg-gray-50">
        <main className="max-w-[1440px] mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            {addresses.length > 0 && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Saved Addresses
                  </h2>
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

            {showAddressForm && (
              <AddressForm
                onSave={handleSaveAddress}
                street={street}
                addresses={addresses}
                city={city}
                state={state}
                postalCode={postalCode}
                onCancel={() => {
                  setEditedAddressIndex(null);
                  setShowAddressForm(false);
                  setStreet("");
                  setCity("");
                  setState("");
                  setPostalCode("");
                }}
                isEditing={editedAddressIndex !== null}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";

const AddressForm = ({
  onSave,
  street: initialStreet,
  city: initialCity,
  state: initialState,
  postalCode: initialPostalCode,
  onCancel,
  isEditing,
  addresses,
}) => {
  const [street, setStreet] = useState(initialStreet || "");
  const [city, setCity] = useState(initialCity || "");
  const [state, setState] = useState(initialState || "");
  const [postalCode, setPostalCode] = useState(initialPostalCode || "");

  const [errors, setErrors] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    setStreet(initialStreet || "");
    setCity(initialCity || "");
    setState(initialState || "");
    setPostalCode(initialPostalCode || "");
    setErrors({
      street: "",
      city: "",
      state: "",
      postalCode: "",
    });
  }, [initialStreet, initialCity, initialState, initialPostalCode]);

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (value.trim() === "") {
      newErrors[fieldName] = `${fieldName} is required`;
      isValid = false;
    } else {
      newErrors[fieldName] = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validateField("street", street) &&
      validateField("city", city) &&
      validateField("state", state) &&
      validateField("postalCode", postalCode)
    ) {
      const address = `${street}, ${city}, ${state}, ${postalCode}`;
      onSave(address);
      setStreet("");
      setCity("");
      setState("");
      setPostalCode("");
    }
  };

  return (
    <div className="my-4 p-4 border rounded bg-gray-100">
      <h2 className="text-lg font-semibold mb-2">
        {isEditing ? "Edit" : "Add"} Address
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Street:</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              validateField("street", e.target.value);
            }}
          />
          {errors.street && <p className="text-red-500">{errors.street}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">City:</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              validateField("city", e.target.value);
            }}
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">State:</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              validateField("state", e.target.value);
            }}
          />
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Postal Code:</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              validateField("postalCode", e.target.value);
            }}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode}</p>
          )}
        </div>
        <div className="flex">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            type="submit"
          >
            Save Address
          </button>
          {addresses.length > 0 && (
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
