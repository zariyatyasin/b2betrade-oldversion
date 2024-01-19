import Layout from "../../../components/admin/Layout/Layout";
import React from "react";

import StatusCard from "../../../components/cards/StatusCard";
import { getCurrentUser } from "../../../utils/session";
import Order from "../../../model/Order";
import { redirect } from "next/navigation";
import db from "../../../utils/db";
import User from "../../../model/User";
import Product from "../../../model/Product";
import Store from "../../../model/Store";
import ListCard from "../../../components/cards/ListCard";
export async function getData() {
  db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const allOrders = await Order.find().lean();
  const completedOrders = await Order.find({ status: "Completed" }).lean();
  const notProcessedOrders = await Order.find({
    status: "Not Processed",
  }).lean();

  const totalOrdersCount = allOrders.length;
  const completedOrdersCount = completedOrders.length;
  const notProcessedOrdersCount = notProcessedOrders.length;
  const totalSell = allOrders.reduce(
    (acc, order) => acc + order.totalBeforeDiscount,
    0
  );

  let totalUser = await User.countDocuments();
  let totalProduct = await Product.countDocuments();
  let totalStore = await Store.countDocuments();

  return {
    totalOrdersCount,
    completedOrdersCount,
    notProcessedOrdersCount,
    totalUser,
    totalStore,
    totalProduct,
    totalSell,

    notProcessedOrders: JSON.parse(JSON.stringify(notProcessedOrders)),
  };
}
export default async function page() {
  const {
    totalOrdersCount,
    completedOrdersCount,
    notProcessedOrdersCount,
    totalUser,
    totalProduct,
    totalSell,
    totalStore,
    notProcessedOrders,
  } = await getData();

  return (
    <Layout>
      <h3 className="px-4 sm:px-6 lg:px-8  text-lg leading-6 font-medium text-gray-900">
        Status
      </h3>
      <div className="px-4 sm:px-6 lg:px-8 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatusCard name="Total Order" stat={totalOrdersCount} />
        <StatusCard name="Completed Order" stat={completedOrdersCount} />
        <StatusCard name="Not Processed Order" stat={notProcessedOrdersCount} />
        <StatusCard name="Total User" stat={totalUser} />
        <StatusCard name="Total Product" stat={totalProduct} />
        <StatusCard name="Total Sell" stat={totalSell} />
        <StatusCard name="Total Store" stat={totalStore} />
      </div>

      <div className="px-4 sm:px-6 lg:px-8  mt-5">
        <h3 className=" mb-5 text-lg leading-6 font-medium text-gray-900">
          New Orders
        </h3>
        <ListCard notProcessedOrders={notProcessedOrders} />
      </div>
    </Layout>
  );
}
