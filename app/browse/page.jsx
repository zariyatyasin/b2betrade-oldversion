import React from "react";
import db from "../../utils/db";
import Product from "../../model/Product";
import Category from "../../model/Category";
import SubCategory from "../../model/SubCategory";
import { filterArray, randomize, removeDuplicates } from "../../utils/Array";

import { Header } from "../../components/Header/Header";
import BrowsePage from "../../components/browse/BrowsePage";
function createRegex(data, styleRegex) {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}
async function getData({ params, searchParams }) {
  db.connectDb();
  const searchQuery = searchParams.search || "";
  const categoryQuery = searchParams.category || "";

  //style

  const priceQuery = searchParams.price?.split("_") || "";
  const styleQuery = searchParams.style?.split("_") || "";
  const styleRegex = `^${styleQuery[0]}`;
  const styleSearchRegex = createRegex(styleQuery, styleRegex);

  const sizeQuery = searchParams.size?.split("_") || "";
  const sizeRegex = `^${sizeQuery[0]}`;
  const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);

  const brandQuery = searchParams.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);

  const patternQuery = searchParams.pattern?.split("_") || "";
  const patternRegex = `^${patternQuery[0]}`;
  const patternSearchRegex = createRegex(patternQuery, patternRegex);

  const materialQuery = searchParams.material?.split("_") || "";
  const materialRegex = `^${materialQuery[0]}`;
  const materialSearchRegex = createRegex(materialQuery, materialRegex);

  const colorQuery = searchParams.color?.split("_") || "";
  const colorRegex = `^${colorQuery[0]}`;
  const colorSearchRegex = createRegex(colorQuery, colorRegex);

  const price =
    priceQuery && priceQuery !== ""
      ? {
          "subProducts.sizes.price": {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};
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

  const style =
    styleQuery && styleQuery !== ""
      ? {
          "details.value": {
            $regex: styleSearchRegex,
            $options: "i",
          },
        }
      : {};

  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          "subProducts.sizes.size": {
            $regex: sizeSearchRegex,
            $options: "i",
          },
        }
      : {};

  const color =
    colorQuery && colorQuery !== ""
      ? {
          "subProducts.color.color": {
            $regex: colorSearchRegex,
            $options: "i",
          },
        }
      : {};
  const pattern =
    patternQuery && patternQuery !== ""
      ? {
          "details.value": {
            $regex: patternSearchRegex,
            $options: "i",
          },
        }
      : {};
  const material =
    materialQuery && materialQuery !== ""
      ? {
          "details.value": {
            $regex: materialSearchRegex,
            $options: "i",
          },
        }
      : {};

  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: {
            $regex: brandSearchRegex,
            $options: "i",
          },
        }
      : {};

  console.log(" this si stykw", brand);
  let productDb = await Product.find({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...material,
    ...pattern,
    ...price,
  })
    .sort({ createdAt: -1 })
    .lean();
  let products = randomize(productDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });

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
