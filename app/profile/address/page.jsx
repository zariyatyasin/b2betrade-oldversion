import React from "react";
import { Header } from "../../../components/Header/Header";

import Layout from "../../../components/profile/layout/Layout";

import { getCurrentUser } from "../../../utils/session";
import User from "../../../model/User";
import Address from "../../../components/Address/Address";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();

  const tab = searchParams.tab || 0;

  const address = await User.findById(session.id).select("address").lean();

  return {
    user: JSON.parse(JSON.stringify(address)),
    tab,

    address: JSON.parse(JSON.stringify(address)),
  };
}
export default async function page({ searchParams }) {
  const { session, tab, user, address } = await getData({ searchParams });

  return (
    <div>
      <Header />

      <Layout
        data={{
          ...session,
          tab,
        }}
      >
        <Address user={address} />
      </Layout>
    </div>
  );
}
