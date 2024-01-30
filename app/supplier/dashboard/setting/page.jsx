import React from "react";
import Layout from "../../../../components/seller/layout/Layout";
import { getCurrentUser } from "../../../../utils/session";

import Store from "../../../../model/Store";

import StoreEditHeader from "../../../../components/store/storeHeader/StoreEditHeader";

async function getData() {
  const session = await getCurrentUser();

  let StoreData = await Store.find({ owner: session.id });

  return {
    StoreData: JSON.parse(JSON.stringify(StoreData)),
  };
}

export default async function Page() {
  const { StoreData } = await getData();

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
