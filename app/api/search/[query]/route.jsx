import Product from "../../../../model/Product";
import db from "../../../../utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await db.connectDb();
  try {
    db.connectDb();

    const { query } = params;

    const suggestions = await Product.find({
      name: { $regex: query, $options: "i" },
    }) // Adapt this to your model and search logic
      .limit(5)
      .select("name");

    db.disconnectDb();
    return NextResponse.json(
      {
        suggestions: suggestions,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse({ message: err }, { status: 500 });
  }
};
