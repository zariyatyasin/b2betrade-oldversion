import React from "react";
import Category from "../../model/Category";
import SubCategory from "../../model/SubCategory";
import { Header } from "../Header/Header";
import db from "../../utils/db";
 
async function getData() {
  await db.connectDb();
  try {
    let categories = await Category.find().lean();
    let subCategories = await SubCategory.find().populate({
      path: "parent",
      model: Category,
    });
   
    return {
   
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;  
  }}

export default async function MainpageLayout({ children }) {
  const { categories, subCategories } = await getData();

   
 
  return (
    <>
      <Header   categories={categories} subCategories={subCategories} />
   
    </>
  );
}
