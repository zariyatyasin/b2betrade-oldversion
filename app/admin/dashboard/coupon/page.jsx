import Layout from "@/components/admin/Layout/Layout";
import CreateCoupon from "@/components/admin/coupon/CreateCoupon";
import Category from "@/model/Category";
import Coupon from "@/model/Coupon";
import db from "@/utils/db";

import React from "react";
async function getData() {
  db.connectDb();

  try {
    const coupon = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    return {
      coupon: JSON.parse(JSON.stringify(coupon)),
      categories: JSON.parse(JSON.stringify(categories)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { coupon, categories } = await getData();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <CreateCoupon coupon={coupon} categories={categories} />
      </div>
    </Layout>
  );
}
