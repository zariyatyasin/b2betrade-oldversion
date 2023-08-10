import Footer from "../components/Footer/Footer";

import { Header } from "../components/Header/Header";
import { HeaderPolicy } from "../components/Header/HeaderPolicy";
import Discount from "../components/home/Discount/Discount";
import { Categories } from "../components/home/category/Categories";
import FlashDeals from "../components/home/flashDeals/FlashDeals";
import Main from "../components/home/main/Main";
import NewProducts from "../components/home/newProducts/NewProducts";
import Tabs from "../components/home/sudzarTabs/Tabs";
import Product from "../model/Product";
import db from "../utils/db";

async function getData() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  return {
    products: JSON.parse(JSON.stringify(products)),
  };
}
export default async function Home() {
  const { products } = await getData();

  return (
    <div>
      <Header />

      <HeaderPolicy />

      <div className=" max-w-[1400px]  mx-auto">
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
