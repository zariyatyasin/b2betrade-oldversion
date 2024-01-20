import React from "react";
import { Header } from "../../components/Header/Header";
import BuyerRequest from "../../components/buyerrequest/BuyerRequest";
import db from "../../utils/db";
import ListSupplier from "../../components/listsupplier/ListSupplier";
import Store from "../../model/Store";
import Category from "../../model/Category";
import SubCategory from "../../model/SubCategory";
import Link from "next/link";
import MainpageLayout from "../../components/layout/MainpageLayout";

function createRegex(data, styleRegex) {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}

async function getData({ params, searchParams }) {
  try {
    await db.connectDb();
    const storeQuery = searchParams.storeType || "";
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
    const store =
      storeQuery && storeQuery !== "" ? { storeType: storeQuery } : {};
    const location =
      locationQuery && locationQuery !== ""
        ? {
            "address.city": {
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

    let locations = await Store.find({ ...category }).distinct("address.city");
    let StoreDb = await Store.find({
      ...store,
      ...location,
      ...category,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let totalProducts = await Store.countDocuments({
      ...store,
      ...location,
      ...category,
    });
    return {
      categories: JSON.parse(JSON.stringify(categories)),
      locations: JSON.parse(JSON.stringify(locations)),

      subCategories: JSON.parse(JSON.stringify(subCategories)),
      paginationCount: Math.ceil(totalProducts / pageSize),

      StoreDb: JSON.parse(JSON.stringify(StoreDb)),
    };
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } finally {
    await db.disconnectDb();
  }
}

export default async function page({ searchParams }) {
  const { StoreDb, categories, locations, subCategories, paginationCount } =
    await getData({
      searchParams,
    });

  return (
    <>
      <MainpageLayout />
      {/* <BuyerRequest
        products={products}
        categories={categories}
        subCategories={subCategories}
        locations={locations}
      /> */}

      <ListSupplier
        name={searchParams.storeType}
        store={StoreDb}
        categories={categories}
        subCategories={subCategories}
        locations={locations}
        paginationCount={paginationCount}
      />
    </>
  );
}
