import React from "react";
import Layout from "../../../../../../components/admin/Layout/Layout";

import db from "../../../../../../utils/db";

import Product from "../../../../../../model/Product";
import User from "../../../../../../model/User";
import Category from "../../../../../../model/Category";
import SubCategory from "../../../../../../model/SubCategory";
import Store from "../../../../../../model/Store";
import EditProduct from "../../../../../../components/admin/product/createproduct/EditProduct";
import { getCurrentUser } from "../../../../../../utils/session";
import { redirect } from "next/navigation";

export async function getData({ params }) {
  db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  let editedProduct = await Product.find({ _id: params.id })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "subCategories",
      model: SubCategory,
    })
    .populate({
      path: "userId",
      model: User,
    })
    .populate({
      path: "storeId",
      model: Store,
    });
  let data = await Category.find().lean();
  return {
    editedProduct: JSON.parse(JSON.stringify(editedProduct)),
    data: JSON.parse(JSON.stringify(data)),
  };
}
export default async function page({ params, searchParams }) {
  const { editedProduct, data } = await getData({ params });

  const componentKey = Date.now();
  return (
    <EditProduct
      editedProduct={editedProduct[0]}
      categories={data}
      id={params.id}
    />
  );
}
