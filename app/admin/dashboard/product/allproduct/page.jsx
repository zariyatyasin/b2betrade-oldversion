import Layout from "../../../../../components/admin/Layout/Layout";
import AllProductList from "../../../../../components/admin/allproduct/AllProductList";
import Category from "../../../../../model/Category";
import SubCategory from "../../../../../model/SubCategory";
import Product from "../../../../../model/Product";
import db from "../../../../../utils/db";
import React from "react";
const { ObjectId } = require("mongodb");
function createRegex(data, styleRegex) {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}

async function getData({ params, searchParams }) {
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const sortQuery = searchParams.sort || "";
  const pageSize = 15;
  const categoryQuery = searchParams.category || "";
  const search =
    searchQuery && searchQuery !== ""
      ? {
          $or: [
            {
              name: {
                $regex: new RegExp(searchParams.search, "i"),
              },
            },
            {
              _id: ObjectId.isValid(searchParams.search)
                ? new ObjectId(searchParams.search)
                : null,
            },
          ],
        }
      : {};

  // const search =
  // searchQuery && searchQuery !== ""
  //   ? {
  //       $or: [
  //         { name: { $regex: searchParams.search, $options: "i" } },
  //         {
  //           _id: searchParams.search,
  //         },
  //       ],
  //     }
  //   : {};
  try {
    await db.connectDb();
    const products = await Product.find({ ...search })
      .populate({ path: "category", model: Category })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();

    let categories = await Category.find().lean();
    let subCategory = await SubCategory.find().populate({
      path: "parent",
      model: Category,
    });

    let totalProducts = await Product.countDocuments({
      ...search,
    });
    await db.disconnectDb();
    return {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategory: JSON.parse(JSON.stringify(subCategory)),
      paginationCount: Math.ceil(totalProducts / pageSize),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}
export default async function page({ searchParams }) {
  const { products, paginationCount, categories, subCategory } = await getData({
    searchParams,
  });
  const componentKey = Date.now();
  return (
    <Layout>
      <AllProductList
        categories={categories}
        subCategory={subCategory}
        key={componentKey}
        products={products}
        paginationCount={paginationCount}
      />
    </Layout>
  );
}
