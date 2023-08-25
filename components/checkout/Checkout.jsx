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
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import FullScreenLoading from "../../loading/FullScreenLoading";
import AddIcon from "@mui/icons-material/Add";
import Steps from "../steps/Steps";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";
export default function Checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editedAddressIndex, setEditedAddressIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState();
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
    if (check) {
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
      <div className="bg-gray-100">
        <main className="max-w-7xl mx-auto pt-12 pb-24  ">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <Steps />

            <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="  lg:col-span-2 ">
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
                                setSelectedAddressIndex={
                                  setSelectedAddressIndex
                                }
                              />
                            ))}
                          </div>
                        </div>
                        {!showAddressForm && (
                          <button
                            className="px-4 py-2 flex items-center bg-gray-900 text-sm text-white"
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
                <div className=" py-6 px-4 sm:px-6 bg-white border border-gray-200   lg:px-8  mt-4">
                  <div className="  mt-2 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-900">
                      Order Details
                    </h2>
                    <div className="flex items-center">
                      <span className=" font-bold"> View All</span>
                      <KeyboardArrowRightOutlinedIcon />
                    </div>
                  </div>
                  <ul role="list" className=" flex gap-4">
                    {cart.products.map((item, id) => (
                      <li
                        className="flex flex-col py-5   max-w-[110px]   "
                        key={id}
                      >
                        <div className=" relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt="Front of men&#039;s Basic Tee in black."
                            className="  w-full"
                          />
                          <div className=" absolute top-0 right-0  text-white p-1 bg-black text-xs">
                            X{item.qty}
                          </div>
                        </div>
                        {/* <div className="flex items-center">
                          <img
                            src={item.color.image}
                            className="h-5 w-5 mt-2 rounded-full"
                          />
                         
                        </div> */}
                        <div className=" ">
                          {/* <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-xs text-gray-900  "
                                >
                                  {item.name.length > 18
                                    ? `${item.name.substring(0, 18)}...`
                                    : item.name}
                                </a>
                              </h4>
                            </div>
                          </div> */}
                          <div></div>
                          <div className="flex mt-2 items-center justify-between  ">
                            <p className=" text-gray-700 text-xs font-medium">
                              Size: {item.size}
                            </p>
                            <p className="  text-xs font-bold  ">
                              ৳ {item.price}{" "}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <h5 className=" text-xs font-bold">STANDARD SHIPPING</h5>
                    <p className=" text-xs text-gray-600 mt-1">
                      Order now for delivery between{" "}
                      <span className=" text-red-600">
                        Wednesday, Aug 23 - Friday, Aug 25{" "}
                      </span>
                      are ≤ <span className="font-bold text-black">10</span>{" "}
                      days
                    </p>
                  </div>
                </div>
                <DeliveryMethod />
              </div>

              <OrderSummary
                totalAfterDiscount={totalAfterDiscount}
                setTotalAfterDiscount={setTotalAfterDiscount}
                cart={cart}
                user={user}
                selectedAddress={selectedAddress}
                setSelectedMethod={setSelectedMethod}
                selectedMethod={selectedMethod}
              />
            </div>
          </div>{" "}
        </main>
      </div>
    </div>
  );
}
