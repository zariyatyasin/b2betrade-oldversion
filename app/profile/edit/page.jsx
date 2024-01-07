import React from "react";
import { Header } from "../../../components/Header/Header";

import Layout from "../../../components/profile/layout/Layout";

import { getCurrentUser } from "../../../utils/session";
import User from "../../../model/User";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProfileEdit from "../../../components/profile/edit/ProfileEdit";
import MobileMenu from "../../../components/mobile/MobileMenu";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";
import Link from "next/link";
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  //   if (!session) {
  //     redirect("/signin");
  //   }
  const tab = searchParams.tab || 0;

  const user = await User.findById(session.id);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });
  return {
    user: JSON.parse(JSON.stringify(user)),
    tab,

    categories: JSON.parse(JSON.stringify(categories)),

    subCategories: JSON.parse(JSON.stringify(subCategories)),
  };
}
export default async function page({ searchParams }) {
  const { session, tab, user, categories, subCategories } = await getData({
    searchParams,
  });

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

        <ProfileEdit data={user} />
        <MobileMenu categories={categories} subCategories={subCategories} />
      </Layout>
    </div>
  );
}
