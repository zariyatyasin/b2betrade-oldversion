import React from "react";
import SupplierRegistration from "../../../../components/b2betrade/SupplierRegistration";
import db from "../../../../utils/db";
import Category from "../../../../model/Category";

async function getData() {
  await db.connectDb();

  const categories = await Category.find().lean();
  await db.disconnectDb();

  return {
    categories: JSON.parse(JSON.stringify(categories)),
  };
}
export default async function page({ params }) {
  const { categories } = await getData();

  return (
    <div>
      <SupplierRegistration userType={params.slug} categories={categories} />
    </div>
  );
}
