import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import OrderComp from "../../../../components/admin/order/OrderComp";
import db from "../../../../utils/db";

import Order from "../../../../model/Order";
import User from "../../../../model/User";

import { getCurrentUser } from "../../../../utils/session";
import { redirect } from "next/navigation";
import Store from "../../../../model/Store";

async function getData({ params, searchParams }) {
  await db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const sortQuery = searchParams.sort || "";
  const sortbydateQuery = searchParams.sortbydate || "";

  const pageSize = 15;
  let Orders;
  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "Not Processed"
      ? { status: "Not Processed" }
      : sortQuery == "Processing"
      ? { status: "Processing" }
      : sortQuery == "Dispatched"
      ? { status: "Dispatched" }
      : sortQuery == "Cancelled"
      ? { status: "Cancelled" }
      : sortQuery == "Completed"
      ? { status: "Completed" }
      : {};
  const sortbydate =
    sortbydateQuery == ""
      ? {}
      : sortbydateQuery == "newest"
      ? { createdAt: -1 }
      : sortbydateQuery == "oldest"
      ? { createdAt: 1 }
      : sortbydateQuery == "topReviewed"
      ? { rating: -1 }
      : sortbydateQuery == "hightolow"
      ? { totalBeforeDiscount: -1 }
      : sortbydateQuery == "lowtohigh"
      ? { totalBeforeDiscount: 1 }
      : {};
  const search =
    searchQuery && searchQuery !== ""
      ? {
          orderNumber: {
            $regex: searchParams.search,
            $options: "i",
          },
        }
      : {};

  Orders = await Order.find({ ...sort, ...search })
    .populate({
      path: "user",
      model: User,
    })
    .populate({
      path: "products.storeId",
      model: "Store",
    })
    .sort(sortbydate)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  Orders = sortQuery && sortQuery !== "" ? Orders : Orders;

  let totalProducts = await Order.countDocuments({ ...search });
  return {
    Orders: JSON.parse(JSON.stringify(Orders)),
    paginationCount: Math.ceil(totalProducts / pageSize),
  };
}
export default async function page({ searchParams }) {
  const { Orders, paginationCount } = await getData({ searchParams });

  const componentKey = Date.now();
  return (
    <Layout>
      <OrderComp
        key={componentKey}
        Orders={Orders}
        paginationCount={paginationCount}
      />
    </Layout>
  );
}
