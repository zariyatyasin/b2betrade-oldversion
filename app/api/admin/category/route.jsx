import { NextResponse } from "next/server";

import { getCurrentUser } from "@/utils/session";
import db from "@/utils/db";
import Category from "@/model/Category";
import slugify from "slugify";

export const POST = async (request) => {
  //   const session = await getCurrentUser();

  // if(!session){
  //   return NextResponse.json( "you must be login in" ,{
  //          status: 201,
  //        })
  //   }

  try {
    db.connectDb();

    const { name } = await request.json();
    const exists = await Category.findOne({ name });
    if (exists) {
      return NextResponse.json(
        "This Category name already exists, try with a different name",
        {
          status: 400,
        }
      );
    }
    await new Category({
      name,
      slug: slugify(name),
    }).save();

    db.disconnectDb();
    return NextResponse.json(
      {
        message: "Category created successfully !",
        categories: await Category.find({}).sort({ updateAt: -1 }),
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse({ message: err.message }, { status: 500 });
  }
};
