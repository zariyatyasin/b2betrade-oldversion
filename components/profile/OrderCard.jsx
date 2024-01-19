"use client";

import Link from "next/link";
import React, { useState } from "react";
import CancelOrderButton from "./CancelOrderButton";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";

export default function OrderCard({ order }) {
  const [orders, setOrder] = useState(order);

  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-20 ">
      {loading && <FullScreenLoading />}
      {orders?.map((order) => (
        <div key={order.number} className=" border bg-white rounded  p-4">
          <h3 className="sr-only">
            Order placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </h3>

          <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
            <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
              <div className="flex justify-between sm:block">
                <dt className="font-medium text-gray-900">Date placed</dt>
                <dd className="sm:mt-1">
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </dd>
              </div>
              <div className="flex justify-between pt-6 sm:block sm:pt-0">
                <dt className="font-medium text-gray-900">Order number</dt>
                <dd className="sm:mt-1">{order.orderNumber}</dd>
              </div>
              <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                <dt>Total amount</dt>
                <dd className="sm:mt-1">
                  ৳{order.totalBeforeDiscount.toLocaleString("en-US")}
                </dd>
              </div>
            </dl>
            <Link href={`/order/${order._id}`} className="text-indigo-600">
              View Invoice
              <span className="sr-only">for order {order.number}</span>
            </Link>
            <div className="mt-4 md:mt-0 flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
              <div>
                {" "}
                {order.status === "Not Processed" && (
                  <CancelOrderButton order={order} setLoading={setLoading} />
                )}
              </div>
              <div> {order.status}</div>
            </div>
          </div>

          <table className="mt-4 w-full text-gray-500 sm:mt-6">
            <caption className="sr-only">Products</caption>
            <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
              <tr>
                <th
                  scope="col"
                  className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="hidden pr-8 py-3 font-normal sm:table-cell"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden pr-8 py-3 font-normal sm:table-cell"
                >
                  payment
                </th>
                <th scope="col" className="w-0 py-3 font-normal text-right">
                  Info
                </th>
              </tr>
            </thead>
            <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
              {order.products.map((product) => (
                <tr key={product.id}>
                  <td className="py-6 pr-8">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="w-16 h-16 object-center object-cover rounded mr-6"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="mt-1 sm:hidden">৳{product.price}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-6 pr-8 sm:table-cell">
                    {product.price}
                  </td>
                  <td className="hidden py-6 pr-8 sm:table-cell">
                    {order.status}
                  </td>
                  <td className="hidden py-6 pr-8 sm:table-cell">
                    {order.paymentMethod == "paypal"
                      ? "Paypal"
                      : order.paymentMethod == "credit_card"
                      ? "Credit Card"
                      : "COD"}
                  </td>
                  <td className="py-6 font-medium text-right whitespace-nowrap">
                    <Link
                      href={`/product/${product?._id}/0/0`}
                      className="text-indigo-600"
                      prefetch={false}
                    >
                      View
                      <span className="hidden lg:inline"> Product</span>
                      <span className="sr-only">, {product.name}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
