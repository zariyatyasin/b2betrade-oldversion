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

    const { name, image } = await request.json();
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
      image,
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

    const { id, name, image } = await request.json();

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json("Category not found", {
        status: 404,
      });
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name);
    }

    if (image) {
      category.image = image;
    }

    await category.save();

    const updatedCategories = await Category.find().sort({ createdAt: -1 });

    db.disconnectDb();
    return NextResponse.json(
      {
        message: "Category updated successfully!",
        categories: updatedCategories,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
