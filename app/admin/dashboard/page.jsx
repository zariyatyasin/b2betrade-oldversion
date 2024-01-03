import Layout from "../../../components/admin/Layout/Layout";
import React from "react";

import StatusCard from "../../../components/cards/StatusCard";
import { getCurrentUser } from "../../../utils/session";
import Order from "../../../model/Order";
import { redirect } from "next/navigation";
import db from "../../../utils/db";

export async function getData() {
  db.connectDb();
  let Orders;
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  if (session?.role === "admin") {
    // If the user is an admin, fetch all Orders
    Orders = await Order.find().lean();
  } else {
    // If the user is not an admin, fetch only their Order
    Orders = await Order.find({ owner: session.id });
  }
  return { Orders: JSON.parse(JSON.stringify(Orders)) };
}
export default async function page() {
  const { Orders } = await getData();

  console.log(Orders);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <StatusCard name="Order" stat={947} />
      </div>
    </Layout>
  );
}
