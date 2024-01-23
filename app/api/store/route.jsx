import { NextResponse } from "next/server";
import db from "../../../utils/db";
import { getCurrentUser } from "../../../utils/session";
import Store from "../../../model/Store";
import User from "../../../model/User";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";

export const PUT = async (request) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 201,
    });
  }

  try {
    await db.connectDb();

    // Extract the necessary fields from the JSON request
    const {
      _id,
      storeName,

      storeAtive,
    } = await request.json();

    const UpdatedStore = await Store.findByIdAndUpdate(
      _id,
      {
        storeName,
        storeAtive,
      },
      {
        new: true,
      }
    );
    const newUpdatedStore = await Store.findById(UpdatedStore._id)
      .populate({
        path: "owner",
        model: User,
      })
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "subCategories",
        model: SubCategory,
      });

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Store updated successfully!",
        newUpdatedStore,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
