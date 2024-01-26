import { NextResponse } from "next/server";

import { getCurrentUser } from "../../../../utils/session";
import db from "../../../../utils/db";
import Category from "../../../../model/Category";
import slugify from "slugify";

export const POST = async (request) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("you must be login in", {
      status: 201,
    });
  }

  try {
    await db.connectDb();

    const { name } = await request.json();
    const slugs = slugify(name);

    const exists = await Category.find({ slug: slugs });

    if (exists.length > 0) {
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
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
export const PUT = async (request) => {
  try {
    await db.connectDb();

    const { id, name } = await request.json();

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      return NextResponse.json("Category not found", {
        status: 404,
      });
    }

    db.disconnectDb();
    return NextResponse.json(
      {
        message: "Category updated successfully !",
        categories: await Category.find({}).sort({ createdAt: -1 }),
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
