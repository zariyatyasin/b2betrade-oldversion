"use client";

import Link from "next/link";
import React from "react";

export default function OrderDetailsComp({ order }) {
  return (
    <div className="bg-gray-50">
      <main className="max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order #{order.orderNumber}
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            <time
              dateTime={order.createdAt}
              className="font-medium text-gray-900"
            >
              {new Date(order.createdAt).toLocaleDateString("en-GB")}
            </time>
          </p>
        </div>

        <section aria-labelledby="products-heading" className="mt-6">
          <h2 id="products-heading" className="sr-only">
            Products purchased
          </h2>

          <div className=" flex flex-wrap gap-4">
            {order.products.map((product) => (
              <div
                key={product._id}
                className="bg-white border-t border-b  border-gray-200 shadow-sm sm:border sm:rounded-lg"
              >
                <div className="py-6 px-4  ">
                  <div className="sm:flex mb-8   ">
                    <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                      />
                    </div>

                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h1 className=" font-extrabold tracking-tight text-gray-900 text-lg">
                        Order #{order.orderNumber}
                      </h1>
                      <h3 className="text-base font-medium text-gray-900  ">
                        <a href="#">{product.name}</a>
                      </h3>
                      <p className="mt-2 text-sm font-bold   text-gray-900">
                        ৳ {product.price}
                      </p>
                      {product.size && (
                        <p className="mt-2 text-sm text-gray-900">
                          Size:
                          <span className=" font-bold"> {product.size}</span>
                        </p>
                      )}
                      {product.size && (
                        <p className="mt-2 text-sm text-gray-900">
                          Quantity:{" "}
                          <span className=" font-bold"> {product.qty}</span>
                        </p>
                      )}

                      <p className="mt-2 text-sm text-gray-950 font-bold">
                        Total Price: ৳ {product.qty * product.price}
                      </p>

                      {product.color !== "" && (
                        <p className="mt-2 text-sm text-gray-500">
                          Color: {product.color.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0  ">
                    <dl className=" flex justify-between gap-20 ">
                      <div className=" flex-1">
                        <dt className="font-medium text-gray-900">
                          Pick Up address
                        </dt>
                        <dd className="mt-3 text-gray-900">
                          <span className="block">
                            {product.storeId.phoneNumber}
                          </span>
                          <span className="block">
                            Store Name: {product.storeId.storeName}
                          </span>

                          <span className="block">
                            Store Address: {product.storeId.ShopAddress}
                          </span>
                        </dd>
                      </div>
                      <div className=" flex-1">
                        <dt className="font-medium text-gray-900">
                          Delivery address
                        </dt>
                        <dd className="mt-3 text-gray-950">
                          <span className="block">
                            {order.shippingAddress.phoneNumber}
                          </span>
                          <span className="block">
                            Name: {order.shippingAddress.fullName}
                          </span>
                          <span className="block">
                            {order.shippingAddress.address1}
                          </span>
                          <span className="block">
                            {order.shippingAddress.address2}
                          </span>
                          <span className="block">
                            {order.shippingAddress.city}
                          </span>
                          <span className="block">
                            {order.shippingAddress.street}
                          </span>
                          <span className="block">
                            {order.shippingAddress.state}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <section
                  aria-labelledby="order-status-heading"
                  className="mt-6"
                >
                  <h2
                    id="order-status-heading"
                    className="font-medium px-4 sm:px-6 text-gray-900 text-xl"
                  >
                    Order Status
                  </h2>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                    <h4 className="sr-only">Status</h4>
                    <p className="text-sm font-medium text-gray-900">
                      Preparing to ship on{" "}
                      <span className=" text-red-600">
                        {new Date(order.updatedAt).toLocaleDateString("en-US")}
                      </span>
                    </p>
                    <div
                      className="mt-2 text-sm font-medium text-blue-800"
                      aria-hidden="true"
                    >
                      <p className="">{order.status}</p>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="summary-heading" className="mt-16">
          <h2 id="summary-heading" className="sr-only">
            Billing Summary
          </h2>

          <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">{order.user.name}</span>
                  <span className="block">{order.user.address[0].street}</span>
                  <span className="block">{order.user.address[0].city}</span>
                  <span className="block">{order.user.address[0].state}</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  Payment information
                </dt>
                <div className="mt-3">
                  <dd className="-ml-4 -mt-4 flex flex-wrap">
                    <div className="ml-4 mt-4 flex-shrink-0">
                      <p className="sr-only">Visa</p>
                    </div>
                    <div className="ml-4 mt-4">
                      <p className="text-gray-900">
                        Ending with {order.user.defaultPaymentMethod}
                      </p>
                      {/* You may need to extract and display the expiration date from the payment method */}
                    </div>
                  </dd>
                </div>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
              <div className="pb-4 flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">
                  ${order.totalBeforeDiscount}
                </dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">
                  ${order.shippingPrice}
                </dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">${order.taxPrice}</dd>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-indigo-600">
                  ${order.totalBeforeDiscount}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
}
