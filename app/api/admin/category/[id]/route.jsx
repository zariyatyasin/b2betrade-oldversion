import { NextResponse } from "next/server";

import { getCurrentUser } from "@/utils/session";
import db from "@/utils/db";
import Category from "@/model/Category";
import slugify from "slugify";
export const DELETE = async (request, { params }) => {
  try {
    db.connectDb();
    const { id } = params;

    const deletedCategory = await Category.findByIdAndRemove(id);

    if (!deletedCategory) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        { status: 500 }
      );
    }

    db.disconnectDb();
    return NextResponse.json(
      {
        message: "Category deleted successfully !",
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
