import { NextResponse } from "next/server";

import db from "../../../../../utils/db";
import Category from "../../../../../model/Category";
import slugify from "slugify";
import SubCategory from "../../../../../model/SubCategory";
export const DELETE = async (request, { params }) => {
  try {
    db.connectDb();
    const { id } = params;

    const deletedSubCategory = await SubCategory.findByIdAndRemove(id);

    if (!deletedSubCategory) {
      return NextResponse.json(
        {
          message: "SubCategory not found",
        },
        {
          status: 404,
        }
      );
    }

    db.disconnectDb();
    return NextResponse.json(
      {
        message: "Subcategory deleted successfully !",
        subcategories: await SubCategory.find({})
          .populate({ path: "parent", model: Category })
          .sort({ updatedAt: -1 }),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  try {
    db.connectDb();

    const { id } = params;

    if (id === "undefined") {
      return NextResponse.json([], { status: 200 });
    }

    const results = await SubCategory.find({ parent: id }).select("name");
    return NextResponse.json(results, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
