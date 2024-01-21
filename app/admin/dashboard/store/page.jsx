import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import StoreComp from "../../../../components/admin/store/Store";
import { revalidatePath } from "next/cache";
import db from "../../../../utils/db";

import Store from "../../../../model/Store";
import User from "../../../../model/User";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

import { getCurrentUser } from "../../../../utils/session";
import { redirect } from "next/navigation";

export async function getData({ params, searchParams }) {
  await db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const sortQuery = searchParams.sort || "";
  const pageSize = 15;
  let Stores;
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
  if (session?.role === "admin") {
    // If the user is an admin, fetch all stores
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

      .limit(pageSize);

    Stores = sortQuery && sortQuery !== "" ? Stores : Stores;
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
