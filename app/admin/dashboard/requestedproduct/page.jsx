import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import BuyerRequest from "../../../../components/buyerrequest/BuyerRequest";
import db from "../../../../utils/db";
import RequestProduct from "../../../../model/RequestProduct";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";
import { getCurrentUser } from "../../../../utils/session";
import { redirect } from "next/navigation";
function createRegex(data, styleRegex) {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}

async function getData({ params, searchParams }) {
  db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const categoryQuery = searchParams.category || "";
  const locationQuery = searchParams.location?.split("_") || "";
  const locationRegex = `^${locationQuery[0]}`;
  const locationSearchRegex = createRegex(locationQuery, locationRegex);
  const category =
    categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};
  const location =
    locationQuery && locationQuery !== ""
      ? {
          location: {
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

  let locations = await RequestProduct.find({
    ...category,
    userId: session.id,
  }).distinct("location");
  let productsDb = await RequestProduct.find({
    userId: session.id,
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

async function page({ searchParams }) {
  const { products, categories, locations, subCategories } = await getData({
    searchParams,
  });

  return (
    <Layout>
      <BuyerRequest
        title={"Requested Product"}
        products={products}
        categories={categories}
        subCategories={subCategories}
        locations={locations}
      />
    </Layout>
  );
}

export default page;
