import React from "react";

import Category from "../../../../model/Category";
import db from "../../../../utils/db";
import Test from "../../../../components/Test";
export const revalidate = 60;

async function getData() {
  await db.connectDb();

  try {
    const categories = await Category.find();

    return { categories: JSON.parse(JSON.stringify(categories)) };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { categories } = await getData();

  return (
    <div>
      <Test categories={categories} />
    </div>
  );
}
