import React from "react";
import db from "../../utils/db";
import Product from "../../model/Product";
import Category from "../../model/Category";
import SubCategory from "../../model/SubCategory";
import { filterArray, randomize, removeDuplicates } from "../../utils/Array";

import { Header } from "../../components/Header/Header";
import BrowsePage from "../../components/browse/BrowsePage";
import MainpageLayout from "../../components/layout/MainpageLayout";
function createRegex(data, styleRegex) {
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      styleRegex += `|^${data[i]}`;
    }
  }
  return styleRegex;
}
async function getData({ params, searchParams }) {
  await db.connectDb();
  const searchQuery = searchParams.search || "";
  const categoryQuery = searchParams.category || "";
  const subcategoryQuery = searchParams.subCategories || "";

  //style

  const shippingQuery = searchParams.shipping || 0;
  const ratingQuery = searchParams.rating || "";
  const page = searchParams.page || 1;
  const pageSize = 50;
  const sortQuery = searchParams.sort || "";
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
          $or: [
            {
              "subProducts.sizes.bulkPricing.price": {
                $gte: Number(priceQuery[0]) || 0,
                $lte: Number(priceQuery[1]) || Infinity,
              },
            },
            {
              "bulkPricing.price": {
                $gte: Number(priceQuery[0]) || 0,
                $lte: Number(priceQuery[1]) || Infinity,
              },
            },
          ],
        }
      : {};

  // const price =
  // priceQuery.length === 2
  //   ? {
  //       "subProducts.sizes.bulkPricing.price": {
  //         $gte: Number(priceQuery[0]) || 0,
  //         $lte: Number(priceQuery[1]) || Infinity,
  //       },
  //     }
  //   : {};

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
  const subCategories =
    subcategoryQuery && subcategoryQuery !== ""
      ? { subCategories: subcategoryQuery }
      : {};

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
  const rating =
    ratingQuery && ratingQuery !== ""
      ? {
          rating: {
            $gte: Number(ratingQuery),
          },
        }
      : {};
  const shipping =
    shippingQuery && shippingQuery == "0"
      ? {
          shipping: 0,
        }
      : {};

  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.bulkPricing.price": -1 }
      : sortQuery == "priceHighToLow"
      ? { "bulkPricing.price": -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.bulkPricing.price": 1 }
      : sortQuery == "priceLowToHigh"
      ? { "bulkPricing.price": 1 }
      : {};
  let productsDb = await Product.find({
    productvisibility: "visible",
    ...search,
    ...category,
    ...subCategories,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...material,
    ...pattern,
    ...price,
    ...shipping,
    ...rating,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .lean();

  let products =
    sortQuery && sortQuery !== "" ? productsDb : randomize(productsDb);
  let categories = await Category.find().lean();
  let subCategory = await SubCategory.find().populate({
    path: "parent",
    model: Category,
  });

  let sizes = await Product.find({ ...category, ...subCategories }).distinct(
    "subProducts.sizes.size"
  );
  let colors = await Product.find({ ...category, ...subCategories }).distinct(
    "subProducts.color.color"
  );
  let brandsDb = await Product.find({ ...category, ...subCategories }).distinct(
    "brand"
  );
  let details = await Product.find({ ...category, ...subCategories }).distinct(
    "details"
  );
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);
  let totalProducts = await Product.countDocuments({
    ...search,
    ...category,
    ...subCategories,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...pattern,
    ...material,

    ...price,
    ...shipping,
    ...rating,
  });

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    products: JSON.parse(JSON.stringify(products)),
    subCategories: JSON.parse(JSON.stringify(subCategory)),
    sizes: JSON.parse(JSON.stringify(sizes)),
    colors: JSON.parse(JSON.stringify(colors)),
    brands: JSON.parse(JSON.stringify(brands)),
    styles: JSON.parse(JSON.stringify(styles)),
    patterns: JSON.parse(JSON.stringify(patterns)),
    materials: JSON.parse(JSON.stringify(materials)),
    shipping: JSON.parse(JSON.stringify(shipping)),
    rating: JSON.parse(JSON.stringify(rating)),
    paginationCount: Math.ceil(totalProducts / pageSize),
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
    shipping,
    rating,
    paginationCount,
  } = await getData({ searchParams });
  const componentKey = Date.now();
  return (
    <>
      <MainpageLayout />
      <BrowsePage
        key={componentKey}
        patterns={patterns}
        materials={materials}
        styles={styles}
        brands={brands}
        colors={colors}
        sizes={sizes}
        shipping={shipping}
        categories={categories}
        products={products}
        subCategories={subCategories}
        rating={rating}
        paginationCount={paginationCount}
      />
    </>
  );
}
