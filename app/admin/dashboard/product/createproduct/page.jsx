import Layout from "../../../../../components/admin/Layout/Layout";
import CreateProduct from "../../../../../components/admin/product/createproduct/CreateProduct";
import Category from "../../../../../model/Category";
import Store from "../../../../../model/Store";
import Product from "..//../../../../model/Product";
import db from "../../../../../utils/db";
import { getCurrentUser } from "../../../../../utils/session";
import React from "react";
async function getData() {
  db.connectDb();
  const session = await getCurrentUser();

  let data;
  let store;
  try {
    data = await Category.find().lean();
    store = await Store.findOne({ owner: session.id });

    // data = await Category.find().lean();
    // category = await Store.findOne({ owner: session.id })
    // .populate({ path: "category", model: Category })
    // .select("category");

    return {
      data: JSON.parse(JSON.stringify(data)),
      store: JSON.parse(JSON.stringify(store)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { data, store } = await getData();

  return (
    <Layout>
      <div className="mx-4 sm:mx-6 lg:mx-8  ">
        <CreateProduct categories={data} />
      </div>
    </Layout>
  );
}
