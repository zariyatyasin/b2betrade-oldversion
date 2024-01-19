import React from "react";
import RequestProductForm from "../../../components/form/RequestProductForm";
import { Header } from "../../../components/Header/Header";
import { redirect } from "next/navigation";
import db from "../../../utils/db";
import Category from "../../../model/Category";
import { getCurrentUser } from "../../../utils/session";
async function getData() {
  await db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const categories = await Category.find().lean();
  db.disconnectDb();

  return {
    session,
    categories: JSON.parse(JSON.stringify(categories)),
  };
}

export default async function page({}) {
  const { session, categories } = await getData();

  return (
    <div>
      <Header />
      <RequestProductForm categories={categories} session={session} />
    </div>
  );
}
