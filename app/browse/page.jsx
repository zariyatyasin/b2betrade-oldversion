import React from "react";
import db from "../../utils/db";
import Product from "../../model/Product";
import Category from "../../model/Category";
import SubCategory from "../../model/SubCategory";
import { filterArray, randomize, removeDuplicates } from "../../utils/Array";

import { Header } from "../../components/Header/Header";
import BrowsePage from "../../components/browse/BrowsePage";

async function getData({ params, searchParams }) {
  db.connectDb();
  const searchQuery = searchParams.search || "";
  const categoryQuery = searchParams.category || "";
  const brandQuery = searchParams.brand || "";
  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            $regex: searchParams.search,
            $options: "i",
          },
        }
      : {};
  const category =
    categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};

  const brand = brandQuery && brandQuery !== "" ? { brand: brandQuery } : {};
  let productDb = await Product.find({ ...search, ...category, ...brand })
    .sort({ createdAt: -1 })
    .lean();
  let products = randomize(productDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });

  console.log({ categories, subCategories });
  let sizes = await Product.find({ ...category }).distinct(
    "subProducts.sizes.size"
  );
  let colors = await Product.find({ ...category }).distinct(
    "subProducts.color.color"
  );
  let brandsDb = await Product.find({ ...category }).distinct("brand");
  let details = await Product.find({ ...category }).distinct("details");
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    products: JSON.parse(JSON.stringify(products)),
    subCategories: JSON.parse(JSON.stringify(subCategories)),
    sizes: JSON.parse(JSON.stringify(sizes)),
    colors: JSON.parse(JSON.stringify(colors)),
    brands: JSON.parse(JSON.stringify(brands)),
    styles: JSON.parse(JSON.stringify(styles)),
    patterns: JSON.parse(JSON.stringify(patterns)),
    materials: JSON.parse(JSON.stringify(materials)),
  };
}
export default async function page({ searchParams }) {
  const {
    categories,
    products,
    subCategories,
    sizes,
    colors,
    brands,
    styles,
    patterns,
    materials,
  } = await getData({ searchParams });

  return (
    <div>
      <Header />
      <BrowsePage
        patterns={patterns}
        materials={materials}
        styles={styles}
        brands={brands}
        colors={colors}
        sizes={sizes}
        categories={categories}
        products={products}
        subCategories={subCategories}
      />
    </div>
  );
}
