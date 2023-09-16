import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "../../../../utils/db";
import Product from "../../../../model/Product";
export const POST = async (request) => {
  try {
    db.connectDb();
    const { parent, ...otherData } = await request.json();

    console.log("this is other data", otherData);

    otherData.slug = slugify(otherData.name);
    const newProduct = new Product({
      name: otherData.name,
      description: otherData.description,
      brand: otherData.brand,
      details: otherData.details,
      questions: otherData.questions,
      slug: otherData.slug,
      category: otherData.category,
      subCategories: otherData.subCategories,
      subProducts: otherData.updatedSubProducts,
    });

    await newProduct.save();
    db.disconnectDb();
    return new NextResponse(
      { message: "Product created Successfully." },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
