import React from "react";
import Header from "../../../components/cart/Header";
import db from "../../../utils/db";
import { getCurrentUser } from "../../../utils/session";
import { redirect } from "next/navigation";
import Order from "../../../model/Order";
import Link from "next/link";
import Footer from "../../../components/Footer/Footer";
import MobileMenu from "../../../components/mobile/MobileMenu";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";

async function getOrder(id) {
  await db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });
  const order = await Order.findById(id).populate("user").lean();

  if (!order) {
    redirect("/checkout ");
  }
  db.disconnectDb();

  return {
    order: JSON.parse(JSON.stringify(order)),
    categories: JSON.parse(JSON.stringify(categories)),
    subCategories: JSON.parse(JSON.stringify(subCategories)),
  };
}

export default async function page({ params }) {
  const { order, subCategories, categories } = await getOrder(params.id);
  const statusMap = {
    "Not Processed": 1,
    Processing: 2,
    Dispatched: 3,
    Completed: 4,
  };
  const progressBarWidth = (statusMap[order.status] || 1) * 33.33; // 33.33 is 100 / 3

  return (
    <div>
      <Header />

      <div className="bg-gray-50">
        <main className="max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order #{order.orderNumber}
              </h1>
              <Link
                href="/profile"
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Profile<span aria-hidden="true"> &rarr;</span>
              </Link>
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
            <Link
              href="/profile"
              className="text-lg font-medium text-indigo-600 hover:text-indigo-500 "
            >
              Go to Home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <section aria-labelledby="products-heading" className="mt-6">
            <h2 id="products-heading" className="sr-only">
              Products purchased
            </h2>

            <div className="space-y-8">
              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
                >
                  <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                    <div className="sm:flex lg:col-span-7">
                      <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                        />
                      </div>

                      <div className="mt-6 sm:mt-0 sm:ml-6">
                        <h3 className="text-base font-medium text-gray-900">
                          <a href="#">{product.name}</a>
                        </h3>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                        {product.size && (
                          <p className="mt-2 text-sm text-gray-500">
                            Size: {product.size}
                          </p>
                        )}
                        {product.color !== "" && (
                          <p className="mt-2 text-sm text-gray-500">
                            Color: {product.color.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:col-span-5">
                      <dl className="grid grid-cols-2 gap-x-6 text-sm">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Delivery address
                          </dt>
                          <dd className="mt-3 text-gray-500">
                            <span className="block">
                              {order.shippingAddress.fullName}
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
                        <div>
                          <dt className="font-medium text-gray-900">
                            Order Details
                          </dt>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            ${product.price} x {product.qty}
                          </p>
                          <dt className="font-medium text-gray-900">
                            Total Price
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            ${product.qty * product.price}
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
                          {new Date(order.updatedAt).toLocaleDateString(
                            "en-US"
                          )}
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
                    <span className="block">
                      {order.user.address[0].street}
                    </span>
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
                  <dd className="font-medium text-gray-900">
                    ${order.taxPrice}
                  </dd>
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
      <MobileMenu categories={categories} subCategories={subCategories} />
      <Footer />
    </div>
  );
}
