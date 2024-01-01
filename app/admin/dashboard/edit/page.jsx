import React from "react";

import Layout from "../../../../components/admin/Layout/Layout";

import { getCurrentUser } from "../../../../utils/session";
import User from "../../../../model/User";

import ProfileEdit from "../../../../components/profile/edit/ProfileEdit";

async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const user = await User.findById(session.id);

  return {
    user: JSON.parse(JSON.stringify(user)),
  };
}
export default async function page({ searchParams }) {
  const { user } = await getData({
    searchParams,
  });

  return (
    <div>
      <Layout>
        <ProfileEdit data={user} />
      </Layout>
    </div>
  );
}
