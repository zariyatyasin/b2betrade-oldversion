import React from "react";
import { Header } from "../../../components/Header/Header";
import Order from "../../../model/Order";
import { getCurrentUser } from "../../../utils/session";
import Layout from "../../../components/profile/layout/Layout";
import Link from "next/link";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();

  const tab = searchParams.tab || 0;

  const filter = searchParams.q.split("__")[1];

  console.log(filter);
  let orders = [];

  if (!filter) {
    orders = await Order.find({ user: session?.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "paid") {
    orders = await Order.find({ user: session?.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "unpaid") {
    orders = await Order.find({ user: session?.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  return {
    session,
    tab,

    orders: JSON.parse(JSON.stringify(orders)),
  };
}
export default async function page({ searchParams }) {
  const { session, tab, orders } = await getData({ searchParams });

  return (
    <div>
      <div className="sticky top-0">
        <Header />
      </div>
      <Layout
        data={{
          ...session,
          tab,
        }}
      >
        {" "}
        <main className=" py-16 ml-10  ">
          <div className=" ">
            <h1 className="text-2xl text-center   w-full font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-1  text-center text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>

          <section aria-labelledby="recent-heading" className="mt-16">
            <h2 id="recent-heading" className="sr-only">
              Recent orders
            </h2>

            <div className="space-y-20 ">
              {orders.map((order) => (
                <div key={order.number} className=" border rounded  p-4">
                  <h3 className="sr-only">
                    Order placed on{" "}
                    <time dateTime={order.datetime}>{order.date}</time>
                  </h3>

                  <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                    <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between sm:block">
                        <dt className="font-medium text-gray-900">
                          Date placed
                        </dt>
                        <dd className="sm:mt-1">
                          <time dateTime={order.datetime}>{order.date}</time>
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-gray-900">
                          Order number
                        </dt>
                        <dd className="sm:mt-1">{order.number}</dd>
                      </div>
                      <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                        <dt>Total amount</dt>
                        <dd className="sm:mt-1">{order.total}</dd>
                      </div>
                    </dl>
                    <Link
                      href={`/order/${order._id}`}
                      className="text-indigo-600"
                    >
                      View Invoice
                      <span className="sr-only">for order {order.number}</span>
                    </Link>
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
                        <th
                          scope="col"
                          className="w-0 py-3 font-normal text-right"
                        >
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
                                <div className="mt-1 sm:hidden">
                                  {product.price}
                                </div>
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
                            <a href={product.href} className="text-indigo-600">
                              View
                              <span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
