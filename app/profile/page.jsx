import React from "react";
import { Header } from "../../components/Header/Header";
import Profile from "../../components/profile/Profile";
import Layout from "../../components/profile/layout/Layout";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { getCurrentUser } from "../../utils/session";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { redirect } from "next/navigation";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Order from "../../model/Order";
import Signout from "./Signout";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Link from "next/link";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import Category from "../../model/Category";
import SubCategory from "../../model/SubCategory";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const validStatusValues = ["Not Processed", "Processing", "Dispatched"];

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
    orders,
  };
}

export default async function page({ searchParams }) {
  const { session, tab, orders } = await getData({ searchParams });

  return (
    <div className="">
      <Header />

      <Layout
        data={{
          ...session,
          tab,
        }}
      >
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="py-10 px-4 bg-white flex-1">
            <div className=" w-full justify-between flex items-center mb-4">
              <h5 className="font-semibold text-gray-950 text-xl">
                Hi, {session.name}
              </h5>
              <Link href={`profile/edit`} className=" flex  items-center">
                <div className=" text-xs text-blue-600 mr-2">Edit</div>{" "}
                <ModeEditOutlinedIcon sx={{ fontSize: 18 }} />
              </Link>
            </div>

            <div className="flex  flex-row flex-wrap gap-4 justify-between mt-8">
              <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
                <FavoriteBorderIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Wish List</p>
              </div>
              <Link
                href={`/profile/orders?tab=1&q=all-orders__`}
                className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
              >
                <TakeoutDiningOutlinedIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Orders</p>
              </Link>

              <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
                <InventoryOutlinedIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Requested</p>
              </div>
              <Link
                href={"/contact"}
                className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
              >
                <HeadsetMicOutlinedIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Help</p>
              </Link>
              {/* <Signout /> */}
            </div>
          </div>
          <div className="py-10 px-4 bg-white flex justify-between w-full sm:w-96">
            <Link
              href={"/profile/address"}
              className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
            >
              <BusinessOutlinedIcon sx={{ fontSize: 28 }} />
              <p className="text-sm mt-2 text-gray-500">Address</p>
            </Link>
            <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
              <SmsOutlinedIcon sx={{ fontSize: 28 }} />
              <p className="text-sm mt-2 text-gray-500">My Message</p>
            </div>

            <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
              <FeedbackOutlinedIcon sx={{ fontSize: 28 }} />
              <p className="text-sm mt-2 text-gray-500">FeedBack</p>
            </div>
          </div>
        </div>
        <div className="mt-5 py-10 px-4 bg-white">
          <h5 className="font-semibold text-gray-950 text-xl">My Orders</h5>

          <div className="py-8    ">
            {orders.length !== 0 ? (
              <div key={orders.number} className=" border rounded  p-4">
                {orders.map((orders) => (
                  <div>
                    <h3 className="sr-only">
                      Order placed on{" "}
                      {new Date(orders.createdAt).toLocaleDateString()}
                    </h3>

                    <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between ">
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
                            {orders.totalBeforeDiscount} ৳
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
                ))}

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
                    {orders?.map((order) =>
                      order.products.map((product) => (
                        <tr key={product._id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.image} // Assuming there is an 'image' property in your product object
                                alt={product.name} // Assuming there is a 'name' property in your product object
                                className="w-16 h-16 object-center object-cover rounded mr-6"
                              />
                              <div>
                                <div className="font-medium lg:hidden text-gray-900">
                                  {product.name.length > 15
                                    ? `${product.name.slice(0, 20)}...`
                                    : product.name}
                                </div>
                                <div className="font-medium hidden sm:block text-gray-900">
                                  {product.name}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {product.price}{" "}
                                  {/* Assuming there is a 'price' property in your product object */}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.qty}X{product.price}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {order.status}{" "}
                            {/* Assuming there is a 'status' property in your order object */}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {order.paymentMethod === "paypal"
                              ? "Paypal"
                              : order.paymentMethod === "credit_card"
                              ? "Credit Card"
                              : "COD"}
                          </td>

                          <td className="py-6 hover:cursor-pointer font-medium text-right whitespace-nowrap">
                            <Link
                              href={`/product/${product.product}/0/0`}
                              className="text-indigo-600"
                            >
                              View
                              <span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">, {product.name}</span>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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
  );
}
