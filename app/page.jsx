import Footer from "../components/Footer/Footer";

import MainpageLayout from "../components/layout/MainpageLayout";
import { Categories } from "../components/home/category/Categories";
import Discount from "../components/home/Discount/Discount";

import Main from "../components/home/main/Main";
import NewProducts from "../components/home/newProducts/NewProducts";

import Product from "../model/Product";
import db from "../utils/db";
import Category from "../model/Category";
import SubCategory from "../model/SubCategory";
import MobileMenu from "../components/mobile/MobileMenu";
import HomeHero from "../model/HomeHero";

async function getData({ searchParams }) {
  try {
    await db.connectDb();

    const productTypeQuery = searchParams.productType || "";
    const productType =
      productTypeQuery && productTypeQuery !== ""
        ? { productType: productTypeQuery }
        : {};

    let newProduct = await Product.find({
      productvisibility: "visible",
      ...productType,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    let categories = await Category.find().lean();
    let homeHero = await HomeHero.find({ imageType: "hero" }).lean();

    let subCategories = await SubCategory.find().populate({
      path: "parent",
      model: Category,
    });
    return {
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      homeHero: JSON.parse(JSON.stringify(homeHero)),
      categories: JSON.parse(JSON.stringify(categories)),

      subCategories: JSON.parse(JSON.stringify(subCategories)),
    };
  } catch (error) {
    console.error("Error during database operations:", error);
    throw error; // Rethrow to handle errors appropriately
  } finally {
    await db.disconnectDb;
  }
}
export default async function Home({ searchParams }) {
  const { newProduct, homeHero, categories } = await getData({
    searchParams,
  });

  return (
    <>
      <MainpageLayout />
      {/* <HeaderAds /> */}
      {/* <TopNavbar/> */}
      {/* <Header categories={categories} subCategories={subCategories} /> */}
      {/* <Example categories={categories} subCategories={subCategories} /> */}
      {/* 
      <HeaderPolicy /> */}

      <div className="  max-w-[1600px]  mx-auto">
        <Main data={homeHero} />
        <Categories Category={categories} />

        {/* <Tabs /> */}
        {/* <FlashDeals /> */}

        {/* <Discount /> */}
      </div>
      <NewProducts products={newProduct} name={"New Arrival"} />
      <Footer />
      {/* <MobileMenu categories={categories} subCategories={subCategories} /> */}
    </>
  );
}
