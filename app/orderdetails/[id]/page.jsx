import React from "react";

import Header from "../../../components/cart/Header";
import db from "../../../utils/db";
import { getCurrentUser } from "../../../utils/session";
import { redirect } from "next/navigation";
import Order from "../../../model/Order";
import Link from "next/link";
import Footer from "../../../components/Footer/Footer";
import OrderDetailsComp from "../../../components/orderDetails/OrderDetailsComp";
import User from "../../../model/User";
import Store from "../../../model/Store";
async function getOrder(id) {
  await db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const order = await Order.findById(id)
    .populate({
      path: "user",
      model: User,
    })
    .populate({
      path: "products.storeId",
      model: Store,
    })
    .lean();

  db.disconnectDb();

  return {
    order: JSON.parse(JSON.stringify(order)),
  };
}

export default async function page({ params }) {
  const { order } = await getOrder(params.id);

  return (
    <div>
      <OrderDetailsComp order={order} />
      <Footer />
    </div>
  );
}
