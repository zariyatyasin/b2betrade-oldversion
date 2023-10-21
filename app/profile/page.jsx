import React from "react";
import { Header } from "../../components/Header/Header";
import Profile from "../../components/profile/Profile";
import { getCurrentUser } from "../../utils/session";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();

  const tab = searchParams.tab || 0;
  return {
    session,
    tab,
  };
}
export default async function page({ searchParams }) {
  const { session, tab } = await getData({ searchParams });

  return (
    <div>
      <Header />

      <Profile
        data={{
          ...session,
          tab,
        }}
      />
    </div>
  );
}
