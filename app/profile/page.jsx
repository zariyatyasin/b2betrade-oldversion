import React from "react";

import OrderCard from "../../components/profile/OrderCard";
import Layout from "../../components/profile/layout/Layout";

import { getCurrentUser } from "../../utils/session";

import { redirect } from "next/navigation";

import Order from "../../model/Order";

import FirstSection from "../../components/profile/FirstSection";
import User from "../../model/User";
import MainpageLayout from "../../components/layout/MainpageLayout";
async function getData({ searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const validStatusValues = ["Not Processed", "Processing", "Dispatched"];
  const user = await User.findById(session.id);
  const orders = await Order.find({
    user: session?.id,
    status: { $in: validStatusValues },
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  const tab = searchParams.tab || 0;
  return {
    session,
    tab,
    orders: JSON.parse(JSON.stringify(orders)),
    user: JSON.parse(JSON.stringify(user)),
  };
}

export default async function page({ searchParams }) {
  const { session, tab, orders, user } = await getData({ searchParams });

  return (
    <>
      <MainpageLayout />
      <div className=" pt-16 lg:pt-32">
        <Layout
          data={{
            ...session,
            tab,
          }}
        >
          <FirstSection name={user.name} />
          <div className="mt-5 py-10 px-4  bg-white">
            <h5 className="font-semibold text-gray-950 text-xl">My Orders</h5>

            <div className="py-8    ">
              {orders.length !== 0 ? (
                <div key={orders.number} className="    ">
                  {/* {orders.map((orders) => (
                  <div>
                    <h3 className="sr-only">
                      Order placed on{" "}
                      {new Date(orders.createdAt).toLocaleDateString()}
                    </h3>

                    <div className="bg-gray-50 rounded-lg py-6 p-2 sm:px-6 sm:flex sm:items-center sm:justify-between ">
                      <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6  lg:flex-none lg:gap-x-8">
                        <div className="flex justify-between sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="sm:mt-1">
                            {new Date(orders.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </dd>
                        </div>
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="sm:mt-1">{orders.orderNumber}</dd>
                        </div>
                        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                          <dt>Total amount</dt>
                          <dd className="sm:mt-1">
                            ৳
                            {orders?.totalBeforeDiscount.toLocaleString(
                              "en-US"
                            )}
                          </dd>
                        </div>
                      </dl>
                      <Link
                        href={`/order/${orders._id}`}
                        className="text-indigo-600"
                      >
                        View Invoice
                        <span className="sr-only">
                          for order {orders.orderNumber}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))} */}

                  <OrderCard order={orders} />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>

                  <div className="text-gray-500">No Orders</div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
