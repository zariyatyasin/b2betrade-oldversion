import { NextResponse } from "next/server";

import { getCurrentUser } from "../../../../utils/session";
import db from "../../../../utils/db";

import slugify from "slugify";
import SubCategory from "../../../../model/SubCategory";
import Category from "../../../../model/Category";

export const POST = async (request) => {
  //   const session = await getCurrentUser();

  // if(!session){
  //   return NextResponse.json( "you must be login in" ,{
  //          status: 201,
  //        })
  //   }

  try {
    db.connectDb();

    const { name, parent } = await request.json();
    console.log(name);
    const exists = await SubCategory.findOne({ name });
    if (exists) {
      return NextResponse.json(
        {
          message:
            "This SubCategory name already exists, try with a different name",
        },
        { status: 500 }
      );
    }
    const newSubCategory = new SubCategory({
      name,
      parent,
      slug: slugify(name),
    });
    await newSubCategory.save();

    // Fetch updated subcategories
    const updatedSubcategories = await SubCategory.find()
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();

    db.disconnectDb();
    return NextResponse.json(
      {
        message: `${name} SubCategory created successfully! `,
        subcategories: updatedSubcategories,
      },
      {},
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
export const PUT = async (request) => {
  try {
    db.connectDb();

    const { id, name, parent } = await request.json();

    const subcategory = await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    if (!subcategory) {
      return NextResponse.json(
        {
          message: "Subcategory not found",
        },
        {
          status: 404,
        }
      );
    }

    db.disconnectDb();
    return NextResponse.json(
      {
        message: `${name} SubCategory updated successfully!`,
        subcategories: await SubCategory.find()
          .populate({ path: "parent", model: Category })
          .sort({ updatedAt: -1 }),
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
