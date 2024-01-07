import React from "react";
import { Header } from "../../../components/Header/Header";

import Layout from "../../../components/profile/layout/Layout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { getCurrentUser } from "../../../utils/session";
import User from "../../../model/User";
import Address from "../../../components/Address/Address";
import Link from "next/link";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
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
        <div className="mb-8">
          <Link className="" href={"/profile"}>
            <KeyboardBackspaceIcon sx={{ fontSize: 28 }} />
          </Link>
        </div>
        <Address user={address} />
      </Layout>
    </div>
  );
}
