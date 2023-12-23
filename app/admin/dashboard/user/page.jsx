import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import User from "../../../../model/User";
import db from "../../../../utils/db";
import ManageUser from "../../../../components/admin/Users/ManageUser";
import UserManage from "../../../../components/admin/Users/UserManage";
async function getData() {
  db.connectDb();

  try {
    const users = await User.find({}).sort({ updatedAt: -1 }).lean();

    return {
      users: JSON.parse(JSON.stringify(users)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { users } = await getData();

  return (
    <Layout>
      <UserManage users={users} />
    </Layout>
  );
}
