import React from "react";
import { Header } from "../../../components/Header/Header";
import Store from "../../../model/Store";
import User from "../../../model/User";
import Product from "../../../model/Product";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";
import StoreHeader from "../../../components/store/storeHeader/StoreHeader";
import StoreNavbar from "../../../components/store/storeHeader/StoreNavbar";
import ProductCardSwip from "../../../components/cards/ProductCardSwip";
import GobackPage from "../../../components/gobackPage/GobackPage";
import Footer from "../../../components/Footer/Footer";

async function getData({ params }) {
  let StoreData = await Store.findById(params.id)
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

  const products = await Product.find({
    productvisibility: "visible",
    storeId: params.id,
  });

  return {
    StoreData: JSON.parse(JSON.stringify(StoreData)),
    products: JSON.parse(JSON.stringify(products)),
  };
}

export default async function page({ params }) {
  const { StoreData, products } = await getData({
    params,
  });

  return (
    <>
      <Header />

      <div className=" max-w-7xl mx-auto">
        <GobackPage />
        <StoreHeader
          storeName={StoreData.storeName}
          headerImage={StoreData.image}
          storeDescription={StoreData.description}
        />
        {
          <>
            <StoreNavbar
              subCategory={StoreData.subCategories}
              storeName={StoreData.storeName}
              storeId={StoreData._id}
            />
            <div className=" pb-24 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
              {products?.map((item, id) => (
                <div className="   " key={id}>
                  <ProductCardSwip products={item} />
                </div>
              ))}
            </div>
          </>
        }
      </div>
      <Footer />
    </>
  );
}
