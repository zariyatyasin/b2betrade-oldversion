import React from "react";
import { Header } from "../../../components/Header/Header";
import Order from "../../../model/Order";
import { getCurrentUser } from "../../../utils/session";
import Layout from "../../../components/profile/layout/Layout";

import OrderCard from "../../../components/profile/OrderCard";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const tab = searchParams.tab || 0;

  const filter = searchParams.q.split("__")[1];

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
        <main className=" pb-24 ">
          <div className="   ">
            <h1 className="text-2xl text-center   w-full font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
          </div>

          <section aria-labelledby="recent-heading" className="mt-16">
            <h2 id="recent-heading" className="sr-only">
              Recent orders
            </h2>

            <OrderCard order={orders} />
          </section>
        </main>
      </Layout>
    </div>
  );
}
