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

import AddIcon from "@mui/icons-material/Add";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";

export default function Address({ cart, user, setSelectedAddress }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editedAddressIndex, setEditedAddressIndex] = useState(null);

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

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
    const check = addresses.find((ad) => ad.active == true);
    if (check && setSelectedAddress) {
      setSelectedAddress(check);
    }

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

      try {
        setLoading(true);
        const res = await saveAddress(address);
        setAddresses(res.addresses);
      } catch (error) {
      } finally {
        setLoading(false);
      }
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
    console.log(id);
    try {
      setLoading(true);

      const res = await changeActiveAddress(id);
      setAddresses(res);
    } catch (error) {
    } finally {
      setLoading(false);
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
  const handleDeleteAddress = async (id) => {
    try {
      setLoading(true);
      const res = await deleteAddress(id);
      console.log(res);
      setAddresses(res);
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);

  return (
    <div>
      {loading && <FullScreenLoading />}
      <div className=" py-6 poin px-4 sm:px-6 bg-white border border-gray-200   lg:px-8 ">
        <h2 className="text-2xl font-black text-gray-900">
          Shipping information
        </h2>
        <div className="  ">
          {addresses?.length > 0 && (
            <div>
              <div className="mb-4 mt-5">
                <div className="">
                  {addresses.map((address, index) => (
                    <AddressCard
                      index={index}
                      loading={loading}
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
                  className="px-4 py-2 flex items-center bg-[#2B39D1] text-sm text-white rounded-md"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  <AddIcon sx={{ fontSize: 24 }} />
                  <span className="ml-1"> Add Address</span>
                </button>
              )}
            </div>
          )}

          {showAddressForm && (
            <AddressForm
              onSave={handleSaveAddress}
              loading={loading}
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
      </div>
    </div>
  );
}
