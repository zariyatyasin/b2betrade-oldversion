import { NextResponse } from "next/server";

import db from "../../../../utils/db";
import Category from "../../../../model/Category";

export const GET = async () => {
  try {
    await db.connectDb();
    const categories = await Category.find().lean();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return new NextResponse({ message: err.message }, { status: 500 });
  }
};
