import Footer from "../components/Footer/Footer";
import Example from "../components/Header/Example";

import { Header } from "../components/Header/Header";
import { HeaderPolicy } from "../components/Header/HeaderPolicy";
import { HeaderAds } from "../components/Header/HeaderAds";
import Discount from "../components/home/Discount/Discount";
import { Categories } from "../components/home/category/Categories";
import FlashDeals from "../components/home/flashDeals/FlashDeals";
import Main from "../components/home/main/Main";
import NewProducts from "../components/home/newProducts/NewProducts";
import Tabs from "../components/home/sudzarTabs/Tabs";
import Product from "../model/Product";
import db from "../utils/db";
import Category from "../model/Category";
import SubCategory from "../model/SubCategory";

async function getData() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });
  return {
    products: JSON.parse(JSON.stringify(products)),
    categories: JSON.parse(JSON.stringify(categories)),

    subCategories: JSON.parse(JSON.stringify(subCategories)),
  };
}
export default async function Home() {
  const { products, categories, subCategories } = await getData();

  return (
    <div>
      {/* <HeaderAds /> */}
      <Header categories={categories} subCategories={subCategories} />
      {/* <Example categories={categories} subCategories={subCategories} /> */}
      {/* 
      <HeaderPolicy /> */}

      <div className=" max-w-[1600px]  mx-auto">
        <Main />
        <Categories />
        <FlashDeals />
        <Discount />
        <Tabs />
        <NewProducts products={products} />
      </div>

      <Footer />
    </div>
  );
}
