import React from "react";
import SupplierRegistration from "../../../../components/b2betrade/SupplierRegistration";
import db from "../../../../utils/db";
import Category from "../../../../model/Category";

async function getData() {
  db.connectDb();

  const categories = await Category.find().lean();
  db.disconnectDb();

  return {
    categories: JSON.parse(JSON.stringify(categories)),
  };
}
export default async function page({ params }) {
  const { categories } = await getData();

  console.log(params.slug);
  return (
    <div>
      <SupplierRegistration userType={params.slug} categories={categories} />
    </div>
  );
}
