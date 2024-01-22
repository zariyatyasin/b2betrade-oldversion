import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "../../../../utils/db";

import Product from "../../../../model/Product";
import Store from "../../../../model/Store";
import { getCurrentUser } from "../../../../utils/session";
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

    const newSlug = slugify(`${otherData.name}-${currentDate}`);

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
