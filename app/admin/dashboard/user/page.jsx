import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import User from "../../../../model/User";
import { redirect } from "next/navigation";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";
import UserManage from "../../../../components/admin/Users/UserManage";
async function getData({ searchParams }) {
  await db.connectDb();

  const validStatusValues = [
    "subadmin",
    "supplier",
    "manufacturer",
    "seller",
    "user",
  ];
  let users;

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const sortQuery = searchParams.sort || "";
  const pageSize = 10;
  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "subadmin"
      ? { role: "subadmin" }
      : sortQuery == "supplier"
      ? { role: "supplier" }
      : sortQuery == "manufacturer"
      ? { role: "manufacturer" }
      : sortQuery == "seller"
      ? { role: "user" }
      : sortQuery == "user"
      ? { role: "user" }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "pending"
      ? { verified: "pending" }
      : sortQuery == "ban"
      ? { verified: "ban" }
      : sortQuery == "block"
      ? { verified: "block" }
      : sortQuery == "active"
      ? { verified: "active" }
      : {};
  const search =
    searchQuery && searchQuery !== ""
      ? {
          phoneNumber: {
            $regex: searchParams.search,
            $options: "i",
          },
        }
      : {};

  try {
    if (session.role === "admin") {
      users = await User.find({ ...search, ...sort })
        .sort({ updatedAt: -1 })
        .lean()
        .skip(pageSize * (page - 1))

        .limit(pageSize);

      users = sortQuery && sortQuery !== "" ? users : users;
    } else {
      users = await User.find({ role: { $in: validStatusValues } })
        .sort({ updatedAt: -1 })
        .lean()
        .skip(pageSize * (page - 1))

        .limit(pageSize);
    }
    let totalUser = await User.countDocuments({ ...search });
    return {
      users: JSON.parse(JSON.stringify(users)),
      paginationCount: Math.ceil(totalUser / pageSize),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page({ searchParams }) {
  const { users, paginationCount } = await getData({ searchParams });
  const componentKey = Date.now();
  return (
    <Layout>
      <UserManage
        key={componentKey}
        users={users}
        paginationCount={paginationCount}
      />
    </Layout>
  );
}
