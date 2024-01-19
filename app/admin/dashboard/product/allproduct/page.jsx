import Layout from "../../../../../components/admin/Layout/Layout";
import AllProductList from "../../../../../components/admin/allproduct/AllProductList";
import Category from "../../../../../model/Category";
import Product from "../../../../../model/Product";
import db from "../../../../../utils/db";
import React from "react";
async function getData() {
  try {
    await db.connectDb();
    const products = await Product.find({})
      .populate({ path: "category", model: Category })
      .sort({ createdAt: -1 })
      .lean();
    await db.disconnectDb();
    return {
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { products } = await getData();

  return (
    <Layout>
      <AllProductList products={products} />
    </Layout>
  );
}
