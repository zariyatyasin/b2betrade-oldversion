import Layout from "../../../../../components/admin/Layout/Layout";
import CreateProduct from "../../../../../components/admin/product/createproduct/CreateProduct";
import Category from "../../../../../model/Category";
import Product from "..//../../../../model/Product";
import db from "../../../../../utils/db";
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
      <div className="mx-4 sm:mx-6 lg:mx-8  ">
        <CreateProduct parents={parents} categories={categories} />
      </div>
    </Layout>
  );
}
