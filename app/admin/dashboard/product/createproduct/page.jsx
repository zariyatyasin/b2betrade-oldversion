import Layout from "@/components/admin/Layout/Layout";
import CreateProduct from "@/components/admin/product/createproduct/CreateProduct";
import Category from "@/model/Category";
import Product from "@/model/Product";
import db from "@/utils/db";
import React from "react";
async function getData() {
  db.connectDb();

  try {
    const parents = await Product.find().select("name subProducts").lean();
    const categories = await Category.find().lean();
    return {
      parents: JSON.parse(JSON.stringify(parents)),
      categories: JSON.parse(JSON.stringify(categories)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { parents, categories } = await getData();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <CreateProduct parents={parents} categories={categories} />
      </div>
    </Layout>
  );
}
