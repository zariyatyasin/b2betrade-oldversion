import React from "react";
import Layout from "../../../../components/seller/layout/Layout";
import { getCurrentUser } from "../../../../utils/session";
import Product from "../../../../model/Product";
import User from "../../../../model/User";
import Store from "../../../../model/Store";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";
import StoreHeader from "../../../../components/store/storeHeader/StoreHeader";
import SuplierNavbar from "../../../../components/store/storeHeader/SuplierNavbar";
import { redirect } from "next/navigation";
import ProductCardSwip from "../../../../components/cards/ProductCardSwip";
import ProductDeleteButton from "../../../../components/productPage/productDelete/ProductDeleteButton";
async function getData({ searchParams }) {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/signin");
  }

  const page = searchParams.page || 1;

  const sortQuery = searchParams.sort || "";
  const sortvisibleQuery = searchParams.sortvisible || "";
  const pageSize = 15;
  const sortvisible =
    sortvisibleQuery == ""
      ? {}
      : sortvisibleQuery == "visible"
      ? { productvisibility: "visible" }
      : sortvisibleQuery == "hidden"
      ? { productvisibility: "hidden" }
      : {};
  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "oldest"
      ? { createdAt: 1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : {};
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

  const products = await Product.find({ ...sortvisible, userId: session.id })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();
  let totalProducts = await Product.countDocuments({
    ...sortvisible,
    userId: session.id,
  });
  return {
    StoreData: JSON.parse(JSON.stringify(StoreData)),
    products: JSON.parse(JSON.stringify(products)),
    paginationCount: Math.ceil(totalProducts / pageSize),
  };
}

export default async function page({ searchParams }) {
  const { StoreData, products, paginationCount } = await getData({
    searchParams,
  });
  const componentKey = Date.now();
  return (
    <Layout>
      <StoreHeader
        storeName={StoreData[0].storeName}
        headerImage={StoreData[0].image}
        storeDescription={StoreData[0].description}
      />

      {
        <>
          <SuplierNavbar paginationCount={paginationCount} />

          <div className=" pb-32 grid grid-cols-2 gap-y-5 gap-x-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
            {products?.map((item, id) => (
              <div className=" relative   " key={id}>
                <ProductDeleteButton
                  id={item._id}
                  visible={item.productvisibility}
                />
                <ProductCardSwip products={item} key={componentKey} />
              </div>
            ))}
          </div>
        </>
      }
    </Layout>
  );
}
