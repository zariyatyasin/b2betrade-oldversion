"use client";
import React, { useEffect, useState } from "react";
import AddressForm from "./AddressFrom";
import { saveAddress, changeActiveAddress } from "../../request/user";
import AddressCard from "./AddressCard";
import FullScreenLoading from "../../loading/FullScreenLoading";
export default function Checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editedAddressIndex, setEditedAddressIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState();
  const [formData, setFormData] = useState({
    fullName: "",

    phoneNumber: "",
    address1: "",
    address2: "",
    street: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    setShowAddressForm(addresses?.length === 0);
  }, [addresses]);

  const handleSaveAddress = async (address) => {
    if (editedAddressIndex !== null) {
      // Edit existing address
      const updatedAddresses = [...addresses];
      updatedAddresses[editedAddressIndex] = address;
      setAddresses(updatedAddresses);
      setEditedAddressIndex(null);
    } else {
      // Add new address
      //loading will be here

      const res = await saveAddress(address);
      setAddresses([...addresses, res]);
    }
    setShowAddressForm(false);
    setFormData({
      fullName: "",

      phoneNumber: "",
      address1: "",
      address2: "",
      street: "",
      city: "",
      state: "",
    });
  };

  const changeAtiveHandler = async (id) => {
    try {
      setLoading(true); // Step 2: Set loading state

      const res = await changeActiveAddress(id);
      setAddresses(res);
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false); // Step 2: Reset loading state
    }
  };

  const handleEditAddress = (index) => {
    const addressToEdit = addresses[index];

    if (addressToEdit) {
      setFormData({
        fullName: addressToEdit.fullName,
        phoneNumber: addressToEdit.phoneNumber,
        address1: addressToEdit.address1,
        address2: addressToEdit.address2,
        street: addressToEdit.street,
        city: addressToEdit.city,
        state: addressToEdit.state,
      });

      setEditedAddressIndex(index);
      setShowAddressForm(true);
    } else {
      console.error("Invalid address index:", index);
    }
  };
  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    setShowAddressForm(updatedAddresses.length === 0);
  };

  return (
    <div>
      <div className="bg-gray-50">
        <FullScreenLoading />
        <main className="max-w-[1440px] mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            {addresses?.length > 0 && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Saved Addresses
                  </h2>
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3  sm:gap-x-4">
                    {addresses.map((address, index) => (
                      <AddressCard
                        index={index}
                        address={address}
                        handleEditAddress={handleEditAddress}
                        key={index}
                        changeAtiveHandler={changeAtiveHandler}
                        handleDeleteAddress={handleDeleteAddress}
                        selectedAddressIndex={selectedAddressIndex}
                        setSelectedAddressIndex={setSelectedAddressIndex}
                      />
                    ))}
                  </div>
                </div>
                {!showAddressForm && (
                  <button
                    className="px-4 py-2 bg-gray-900 text-white"
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
                formData={formData}
                onCancel={() => {
                  setEditedAddressIndex(null);
                  setShowAddressForm(false);
                  setFormData({
                    fullName: "",

                    phoneNumber: "",
                    address1: "",
                    address2: "",
                    street: "",
                    city: "",
                    state: "",
                  });
                }}
                addresses={addresses}
                isEditing={editedAddressIndex !== null}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
