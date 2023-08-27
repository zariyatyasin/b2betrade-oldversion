import Layout from "@/components/admin/Layout/Layout";
import db from "@/utils/db";
import React from "react";
import Category from "@/model/Category";
import CreateCategories from "@/components/admin/categories/CreateCategories";

async function getData() {
  db.connectDb();

  try {
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();

    return { categories: JSON.parse(JSON.stringify(categories)) };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { categories } = await getData();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <CreateCategories categories={categories} />
      </div>
    </Layout>
  );
}
