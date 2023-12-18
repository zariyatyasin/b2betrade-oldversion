import React from "react";
import { Header } from "../../components/Header/Header";
import Profile from "../../components/profile/Profile";
import Layout from "../../components/profile/layout/Layout";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { getCurrentUser } from "../../utils/session";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

import { redirect } from "next/navigation";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Order from "../../model/Order";
import Signout from "./Signout";
import Link from "next/link";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const orders = await Order.find({ user: session?.id, status: "Processing" })
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
            <h5 className="font-semibold text-gray-950 text-xl">
              Hi, {session.name}
            </h5>

            <div className="flex  flex-row flex-wrap gap-4 justify-between mt-5">
              <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
                0<p className="text-sm mt-2 text-gray-500">Coupons</p>
              </div>
              <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
                <TakeoutDiningOutlinedIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Orders</p>
              </div>

              <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
                <InventoryOutlinedIcon sx={{ fontSize: 28 }} />
                <p className="text-sm mt-2 text-gray-500">Requested</p>
              </div>
              <Signout />
            </div>
          </div>
          <div className="py-10 px-4 bg-white flex justify-between w-full sm:w-96">
            <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
              <SmsOutlinedIcon sx={{ fontSize: 28 }} />
              <p className="text-sm mt-2 text-gray-500">My Message</p>
            </div>
            <Link
              href={"/profile/address"}
              className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0"
            >
              <BusinessOutlinedIcon sx={{ fontSize: 28 }} />
              <p className="text-sm mt-2 text-gray-500">Address</p>
            </Link>
            <div className="flex justify-center cursor-pointer items-center flex-col mb-4 sm:mb-0">
              <FeedbackOutlinedIcon sx={{ fontSize: 28 }} />
              <p className="text-sm mt-2 text-gray-500">FeedBack</p>
            </div>
          </div>
        </div>
        <div className="mt-5 py-10 px-4 bg-white">
          <h5 className="font-semibold text-gray-950 text-xl">My Orders</h5>

          <div className="py-8 flex items-center justify-center">
            {orders.length !== 0 ? (
              <div>some product</div>
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
