import React from "react";

import db from "../../../../../../utils/db";
import OrderCard from "../../../../../../components/cards/OrderCard";
import { getCurrentUser } from "../../../../../../utils/session";
import { redirect } from "next/navigation";
import Store from "../../../../../../model/Store";
import Category from "../../../../../../model/Category";
import SubCategory from "../../../../../../model/SubCategory";
import Order from "../../../../../../model/Order";
import User from "../../../../../../model/User";
export async function getData({ params }) {
  await db.connectDb();
  let store;
  let orders;
  let user;
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  store = await Store.find({ owner: params.id })
    .populate({
      path: "owner",
      model: User,
    })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "subCategories",
      model: SubCategory,
    });

  orders = await Order.find({ user: params.id }).populate({
    path: "user",
    model: User,
  });
  user = await User.findById(params.id);
  return {
    orders: JSON.parse(JSON.stringify(orders)),
    store: JSON.parse(JSON.stringify(store)),
    user: JSON.parse(JSON.stringify(user)),
  };
}
export default async function page({ params }) {
  const { orders, store, user } = await getData({ params });

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-xl font-bold mb-4">User Information</h2>
      <div className="bg-white rounded-lg overflow-hidden shadow-md mx-2 my-4 p-6 flex">
        {/* User Image */}
        <div className="mr-6">
          <img
            src={user.image}
            alt={user.name}
            className="rounded-full h-20 w-20"
          />
        </div>

        {/* User Details */}
        <div className="flex justify-between w-full">
          <h1 className="text-xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 text-sm mb-4">
            {/* Additional user details */}
          </p>

          {/* Address Information */}
          {user.address.map((address) => (
            <div key={address._id} className="mb-4">
              <h2 className="text-lg font-bold mb-2">Address</h2>
              <p className="text-sm">{address.fullName}</p>
              <p className="text-sm">{address.address1}</p>
              <p className="text-sm">{address.address2}</p>
              <p className="text-sm">{address.city}</p>
              <p className="text-sm">{address.street}</p>
              <p className="text-sm">{address.state}</p>
            </div>
          ))}

          {/* User Information */}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">User Information</h2>
            <p className="text-sm">Email: {user.email}</p>
            <p className="text-sm">Phone: {user.phoneNumber}</p>
          </div>

          {/* Additional User Information */}
          <div>
            <h2 className="text-lg font-bold mb-2">Additional Information</h2>
            <p className="text-sm">Role: {user.role}</p>
            <p className="text-sm">
              Email Verified: {user.emailVerified ? "Yes" : "No"}
            </p>
            <p className="text-sm">
              Default Payment Method: {user.defaultPaymentMethod}
            </p>
            <p className="text-sm">Created At: {user.createdAt}</p>
            <p className="text-sm">Updated At: {user.updatedAt}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
      {store.length > 1 && (
        <h2 className="text-xl font-bold mb-4">Store Information</h2>
      )}{" "}
      {store &&
        store.map((storeInfo) => (
          <div
            key={storeInfo._id}
            className="bg-white rounded-lg overflow-hidden shadow-md mx-2 my-4 p-6 flex"
          >
            {/* Store Image */}
            <div className="mr-6">
              <img
                src={storeInfo.image}
                alt={storeInfo.storeName}
                className="rounded-full h-20 w-20"
              />
            </div>

            {/* Store Details */}
            <div className=" flex justify-between   w-full">
              <h1 className="text-xl font-bold mb-2">{storeInfo.storeName}</h1>
              <p className="text-gray-600 text-sm mb-4">
                {storeInfo.description}
              </p>

              {/* Address Information */}
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Address</h2>
                <p className="text-sm">{storeInfo.address.street}</p>
                <p className="text-sm">
                  {storeInfo.address.city}, {storeInfo.address.country}
                </p>
              </div>

              {/* Owner Information */}
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Owner</h2>
                <p className="text-sm">Name: {storeInfo.owner.name}</p>
                <p className="text-sm">Email: {storeInfo.owner.email}</p>
                <p className="text-sm">Phone: {storeInfo.owner.phoneNumber}</p>
              </div>

              {/* Additional Store Information */}
              <div>
                <h2 className="text-lg font-bold mb-2">
                  Additional Information
                </h2>
                <p className="text-sm">Category: {storeInfo.category.name}</p>
                <p className="text-sm">Status: {storeInfo.storeAtive}</p>
                <p className="text-sm">
                  Verified: {storeInfo.isVerify ? "Yes" : "No"}
                </p>
                <p className="text-sm">Revenue: ${storeInfo.revenue}</p>
                {/* Add more fields as needed */}
              </div>
            </div>
          </div>
        ))}
      {/* Order Information */}
      <div>
        <h2 className="text-xl font-bold mb-4">Order Information</h2>
        {orders.map((order) => (
          <OrderCard data={order} />
        ))}
      </div>
    </div>
  );
}
