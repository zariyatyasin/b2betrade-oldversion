import { NextResponse } from "next/server";
import db from "../../../../../../utils/db";
import { getCurrentUser } from "../../../../../../utils/session";
import Product from "../../../../../../model/Product";
import Category from "../../../../../../model/Category";
import SubCategory from "../../../../../../model/SubCategory";

export const PUT = async (request, { params }) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 201,
    });
  }

  try {
    db.connectDb();
    const { id } = params;

    const editedData = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, editedData, {
      new: true,
    });
    const newUpdatedProduct = await Product.findById(updatedProduct._id)
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
        message: "Product updated successfully!",
        newUpdatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
   
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
