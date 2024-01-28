import Layout from "../../../../components/admin/Layout/Layout";
import db from "../../../../utils/db";
import React from "react";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";
import CreateSubCategory from "../../../../components/admin/subcategory/CreateSubCategory";

async function getData() {
  await db.connectDb();

  try {
    const categories = await Category.find();
    const subcategories = await SubCategory.find().populate({
      path: "parent",
      model: Category,
    });

    return {
      categories: JSON.parse(JSON.stringify(categories)),
      subcategories: JSON.parse(JSON.stringify(subcategories)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page() {
  const { categories, subcategories } = await getData();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <CreateSubCategory
          categories={categories}
          subcategories={subcategories}
        />
      </div>
    </Layout>
  );
}
