import React from "react";
import Layout from "../../../../components/seller/layout/Layout";
import { getCurrentUser } from "../../../../utils/session";
import Product from "../../../../model/Product";
import User from "../../../../model/User";
import Store from "../../../../model/Store";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";
import StoreEditHeader from "../../../../components/store/storeHeader/StoreEditHeader";

import { redirect } from "next/navigation";

async function getData() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/signin");
  }
  let StoreData = await Store.find({ owner: session.id });

  return {
    StoreData: JSON.parse(JSON.stringify(StoreData)),
  };
}

export default async function page() {
  const { StoreData } = await getData();

  console.log(StoreData);
  return (
    <Layout>
      <StoreEditHeader
        id={StoreData[0]._id}
        storeName={StoreData[0].storeName}
        image={StoreData[0].image}
        description={StoreData[0].description}
      />
    </Layout>
  );
}
