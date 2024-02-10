import React from "react";
import { Header } from "../../../components/Header/Header";
import BuyerRequest from "../../../components/buyerrequest/BuyerRequest";
import db from "../../../utils/db";
import RequestProduct from "../../../model/RequestProduct";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";
import MainpageLayout from "../../../components/layout/MainpageLayout";
function createRegex(data, styleRegex) {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}

async function getData({ searchParams }) {
  await db.connectDb();
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const sortQuery = searchParams.sort || "";
  const pageSize = 10;
  const categoryQuery = searchParams.category || "";
  const locationQuery = searchParams.location?.split("_") || "";
  const locationRegex = `^${locationQuery[0]}`;
  const locationSearchRegex = createRegex(locationQuery, locationRegex);
  const category =
    categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};
  const location =
    locationQuery && locationQuery !== ""
      ? {
          "shippingAddress.city": {
            $regex: locationSearchRegex,
            $options: "i",
          },
        }
      : "";

  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });

  let locations = await RequestProduct.find({ ...category }).distinct(
    "shippingAddress.city"
  );
  let productsDb = await RequestProduct.find({
    ...location,
    ...category,
  }).lean();

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    locations: JSON.parse(JSON.stringify(locations)),

    subCategories: JSON.parse(JSON.stringify(subCategories)),
    location: JSON.parse(JSON.stringify(productsDb)),
    products: JSON.parse(JSON.stringify(productsDb)),
  };
}

export default async function page({ searchParams }) {
  const { products, categories, locations, subCategories } = await getData({
    searchParams,
  });

  return (
    <div className=" ">
      <MainpageLayout />

      <BuyerRequest
        products={products}
        categories={categories}
        subCategories={subCategories}
        locations={locations}
      />
    </div>
  );
}
