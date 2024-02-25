import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "../../../../utils/db";

import Product from "../../../../model/Product";
import Store from "../../../../model/Store";
import { getCurrentUser } from "../../../../utils/session";
function generateRandomString(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

async function generateUniqueSKU(existingSKUs) {
  const skuLength = 8;
  let isUnique = false;
  let sku;

  while (!isUnique) {
    sku = generateRandomString(skuLength);
    if (!existingSKUs.includes(sku)) {
      isUnique = true;
    }
  }

  return sku;
}
export const POST = async (request) => {
  const session = await getCurrentUser();
  await db.connectDb();

  if (!session) {
    return new NextResponse.json("you must be login in", {
      status: 201,
    });
  }

  try {
    const { parent, ...otherData } = await request.json();
    let store = await Store.findOne({ owner: session.id });

    if (!store) {
      return new NextResponse(
        { message: "YOu need to create store" },
        { status: 202 }
      );
    }

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const existingSKUs = await Product.find({}, { sku: 1 });
    const sku = await generateUniqueSKU(
      existingSKUs.map((product) => product.sku)
    );
    const newSlug = slugify(`${otherData.name}-${sku}`);

    const newProduct = new Product({
      userId: session.id,

      name: otherData.name,
      description: otherData.description,
      brand: otherData.brand,
      productvisibility: otherData.productvisibility,
      vendor: session.id,
      details: otherData.details,
      bulkPricing: otherData.bulkPricing,
      questions: otherData.questions,
      slug: newSlug,
      section: otherData.section,
      shipping: otherData.shipping,
      category: otherData.category,
      subCategories: otherData.subCategories,
      subProducts: otherData.updatedSubProducts,
      storeId: store._id,
      sku: sku,
    });

    let savedProduct = await newProduct.save();

    store.products.push(savedProduct._id);

    return new NextResponse(
      { message: "Product created Successfully." },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
