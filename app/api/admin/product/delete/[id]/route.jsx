import { NextResponse } from "next/server";
import db from "../../../../../../utils/db";
import { getCurrentUser } from "../../../../../../utils/session";
import Product from "../../../../../../model/Product";

export const DELETE = async (request, { params }) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 401,
    });
  }

  try {
    await db.connectDb();
    const { id } = params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      db.disconnectDb();
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(id);

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Product deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
