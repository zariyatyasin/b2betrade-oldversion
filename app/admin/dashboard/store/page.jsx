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
async function getData({ searchParams }) {
  await db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const sortQuery = searchParams.sort || "";
  const sortbydateQuery = searchParams.sortbydate || "";
  const pageSize = 20;
  let Stores;

  const sortbydate =
    sortbydateQuery == ""
      ? {}
      : sortbydateQuery == "newest"
      ? { createdAt: -1 }
      : sortbydateQuery == "oldest"
      ? { createdAt: 1 }
      : sortbydateQuery == "topReviewed"
      ? { rating: -1 }
      : {};

  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "pending"
      ? { storeAtive: "pending" }
      : sortQuery == "active"
      ? { storeAtive: "active" }
      : sortQuery == "ban"
      ? { storeAtive: "ban" }
      : sortQuery == "block"
      ? { storeAtive: "block" }
      : {};

  const search =
    searchQuery && searchQuery !== ""
      ? {
          $or: [
            {
              storeName: {
                $regex: new RegExp(searchParams.search, "i"),
              },
            },
            {
              phoneNumber: {
                $regex: searchParams.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

  Stores = await Store.find({ ...sort, ...search })
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
    })
    .skip(pageSize * (page - 1))
    .sort(sortbydate)

    .limit(pageSize);

  // Stores = sortQuery && sortQuery !== "" ? Stores : Stores;

  let totalProducts = await Store.countDocuments({ ...search });
  return {
    Stores: JSON.parse(JSON.stringify(Stores)),
    paginationCount: Math.ceil(totalProducts / pageSize),
  };
}

export default async function page({ searchParams }) {
  const { Stores, paginationCount } = await getData({ searchParams });

  const componentKey = Date.now();
  return (
    <Layout>
      <StoreComp
        key={componentKey}
        Stores={Stores}
        paginationCount={paginationCount}
      />
    </Layout>
  );
}
