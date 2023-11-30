import Footer from "../components/Footer/Footer";
import Example from "../components/Header/Example";
import MainpageLayout from "../components/layout/MainpageLayout";
import { Header } from "../components/Header/Header";
import { HeaderPolicy } from "../components/Header/HeaderPolicy";
import { HeaderAds } from "../components/Header/HeaderAds";
import TopNavbar from "../components/Header/TopNavbar";
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
import MobileMenu from "../components/mobile/MobileMenu";
async function getData({ searchParams }) {
  db.connectDb();

  const productTypeQuery = searchParams.productType || "";
  const productType =
    productTypeQuery && productTypeQuery !== ""
      ? { productType: productTypeQuery }
      : {};

  let products = await Product.find({ ...productType })
    .sort({ createdAt: -1 })
    .lean();
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
export default async function Home({ searchParams }) {
  const { products, categories, subCategories } = await getData({
    searchParams,
  });

  return (
    <MainpageLayout>
      {/* <HeaderAds /> */}
      {/* <TopNavbar/> */}
      {/* <Header categories={categories} subCategories={subCategories} /> */}
      {/* <Example categories={categories} subCategories={subCategories} /> */}
      {/* 
      <HeaderPolicy /> */}

      <div className=" max-w-[1600px]  mx-auto">
        <Main />
        {/* <Categories />
        <FlashDeals />
        <Discount />
        <Tabs /> */}
        <NewProducts products={products} />
      </div>

      <Footer />
      <MobileMenu categories={categories} subCategories={subCategories} />
    </MainpageLayout>
  );
}
