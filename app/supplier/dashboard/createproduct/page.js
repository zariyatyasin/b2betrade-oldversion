import React from "react";
import Layout from "../../../../components/seller/layout/Layout";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";
import Category from "../../../../model/Category";
import CreateProduct from "../../../../components/admin/product/createproduct/CreateProduct";
import Store from "../../../../model/Store";
 
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
     
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { data, store ,user} = await getData();

 

  return (
    <Layout>
       {/* {user.role !=="admin" && <NotToaccessOverly props={"YOu cant create the product if you need help call"}/>} */}
      <CreateProduct categories={data} />
    </Layout>
  );
}
