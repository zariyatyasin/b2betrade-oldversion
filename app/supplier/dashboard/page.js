import React from "react";
import Layout from "../../../components/seller/layout/Layout";
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
  await db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const store = await Store.findOne({ owner: session.id });
  const OwnerStoreId = store._id;

  const processedProductsCount = await Product.countDocuments({
    userId: session.id,
  });

  let Orders = await Order.find();
  const filteredOrders = Orders.map((order) => {
    const matchingProducts = order.products.filter((product) => {
      return product.storeId.toString() === OwnerStoreId.toString();
    });

    return {
      ...order._doc,
      products: matchingProducts,
    };
  }).filter((order) => order.products.length > 0);

  const statusCounts = {
    NotProcessed: 0,
    Processing: 0,
    Dispatched: 0,
    Cancelled: 0,
    Completed: 0,
  };
  let totalSellCompleted = 0;

  filteredOrders.forEach((order) => {
    order.products.forEach((product) => {
      // Count status
      statusCounts[product.status]++;

      // Calculate total sell for Completed status
      if (product.status === "Completed") {
        totalSellCompleted += product.price * product.qty;
      }
    });
  });

  const totalOrdersCount = filteredOrders.length;
  return {
    totalOrdersCount: JSON.parse(JSON.stringify(totalOrdersCount)),
    statusCounts,
    totalSellCompleted,
    processedProductsCount,
  };
}

export default async function page() {
  const {
    totalOrdersCount,
    statusCounts,
    totalSellCompleted,
    processedProductsCount,
  } = await getData();

  return (
    <Layout>
      <h3 className="px-4 sm:px-6 lg:px-8  text-lg leading-6 font-medium text-gray-900">
        Status
      </h3>
      <div className="px-4 sm:px-6 lg:px-8 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatusCard name="Total Product" stat={processedProductsCount} />
        <StatusCard name="Total Order" stat={totalOrdersCount} />

        <StatusCard name="Completed Order" stat={statusCounts.Completed} />
        <StatusCard
          name="Not Processed Order"
          stat={statusCounts.NotProcessed}
        />
        <StatusCard name="Total Cancle" stat={statusCounts.Cancelled} />

        <StatusCard name="Total Sell" stat={totalSellCompleted} />
      </div>
    </Layout>
  );
}
