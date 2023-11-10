import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import StoreComp from "../../../../components/admin/store/Store";

import db from "../../../../utils/db";

import Store from "../../../../model/Store";
import User from "../../../../model/User";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

import { getCurrentUser } from "../../../../utils/session";
import { redirect } from "next/navigation";

async function getData({ params, searchParams }) {
  db.connectDb();

  const session = await getCurrentUser();
  // if (!session) {
  //   redirect("/signin");
  // }

  let Stores;

  if (session?.role === "admin") {
    // If the user is an admin, fetch all stores
    Stores = await Store.find()
      .populate({
        path: "owner",
        model: User,
      })
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "subCategories",
        model: SubCategory,
      });
  } else {
    // If the user is not an admin, fetch only their store
    Stores = await Store.find({ owner: session.id })
      .populate({
        path: "owner",
        model: User,
      })
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "subCategories",
        model: SubCategory,
      });
  }

  return {
    Stores: JSON.parse(JSON.stringify(Stores)),
  };
}

export default async function page({ searchParams }) {
  const { Stores } = await getData({ searchParams });
  return (
    <Layout>
      <StoreComp Stores={Stores} />
    </Layout>
  );
}
