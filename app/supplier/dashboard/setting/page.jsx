import React from "react";
import Layout from "../../../../components/seller/layout/Layout";
import { getCurrentUser } from "../../../../utils/session";

import Store from "../../../../model/Store";

import StoreEditHeader from "../../../../components/store/storeHeader/StoreEditHeader";
import User from "../../../../model/User";
import ProfileEdit from "../../../../components/profile/edit/ProfileEdit";

async function getData() {
  const session = await getCurrentUser();

  let StoreData = await Store.find({ owner: session.id });
  const user = await User.findById(session.id);
  return {
    StoreData: JSON.parse(JSON.stringify(StoreData)),
    user: JSON.parse(JSON.stringify(user)),
  };
}

export default async function Page() {
  const { StoreData, user } = await getData();

  return (
    <Layout>
      <StoreEditHeader
        id={StoreData[0]._id}
        storeName={StoreData[0].storeName}
        image={StoreData[0].image}
        description={StoreData[0].description}
      />
      <ProfileEdit data={user} />
    </Layout>
  );
}
