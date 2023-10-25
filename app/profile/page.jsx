import React from "react";
import { Header } from "../../components/Header/Header";
import Profile from "../../components/profile/Profile";
import Layout from "../../components/profile/layout/Layout";
import { getCurrentUser } from "../../utils/session";
import { redirect } from "next/navigation";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
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

      <Layout
        data={{
          ...session,
          tab,
        }}
      >
        {" "}
        <div className="py-6">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            {/* Replace with your content */}
            <div className="py-4">
              <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg" />
            </div>
            {/* /End replace */}
          </div>
        </div>
      </Layout>
    </div>
  );
}
