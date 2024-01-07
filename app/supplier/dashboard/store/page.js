import React from "react";
import Layout from "../../../../components/seller/layout/Layout";
import { getCurrentUser } from "../../../../utils/session";
import Product from "../../../../model/Product";
import User from "../../../../model/User";
import Store from "../../../../model/Store";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";
import StoreHeader from "../../../../components/store/storeHeader/StoreHeader";
import StoreNavbar from "../../../../components/store/storeHeader/StoreNavbar";
import { redirect } from "next/navigation";
import ProductCardSwip from "../../../../components/cards/ProductCardSwip";
async function getData() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/signin");
  }
  let StoreData = await Store.find({ owner: session.id })
    .populate({
      path: "owner",
      model: User,
    })
    .populate({
      path: "products",
      model: Product,
    })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "subCategories",
      model: SubCategory,
    });

  const products = await Product.find({ userId: session.id });

  return {
    StoreData: JSON.parse(JSON.stringify(StoreData)),
    products: JSON.parse(JSON.stringify(products)),
  };
}

export default async function page() {
  const { StoreData, products } = await getData();

  return (
    <Layout>
      <StoreHeader
        storeName={StoreData[0].storeName}
        headerImage={StoreData[0].headerImage}
        storeDescription={StoreData[0].description}
      />

      {StoreData[0].storeAtive === "active" && (
        <>
          <StoreNavbar subCategory={StoreData[0].subCategories} />
          <div className="h-screen  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((item, id) => (
              <div className="   " key={id}>
                <ProductCardSwip products={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
