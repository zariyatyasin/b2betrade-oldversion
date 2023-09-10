import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "../../../../utils/db";
import Product from "../../../../model/Product";
export const POST = async (request) => {
  try {
    db.connectDb();
    const { parent, ...otherData } = await request.json();

    if (parent) {
      const parentProduct = await Product.findById(parent);

      if (!parentProduct) {
        return new NextResponse(
          { message: "Parent product not found!" },
          { status: 400 }
        );
      }

      const newParent = await parentProduct.updateOne(
        {
          $push: {
            subProducts: {
              sku: otherData.sku,
              color: otherData.color,
              images: otherData.images,
              sizes: otherData.sizes,
              discount: otherData.discount,
            },
          },
        },
        { new: true }
      );

      return new NextResponse(newParent, { status: 201 });
    } else {
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
        subProducts: [
          {
            sku: otherData.sku,
            color: otherData.color,
            images: otherData.images,
            sizes: otherData.sizes,
            discount: otherData.discount,
          },
        ],
      });

      await newProduct.save();
      db.disconnectDb();
      return new NextResponse(
        { message: "Product created Successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
