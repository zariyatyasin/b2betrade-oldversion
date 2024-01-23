import { NextResponse } from "next/server";
import db from "../../../../../utils/db";
import { getCurrentUser } from "../../../../../utils/session";
import Store from "../../../../../model/Store";

export const PUT = async (request, { params }) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 401,
    });
  }

  try {
    await db.connectDb();
    const { id } = params;
    const { description, image } = await request.json();

    const store = await Store.findById(id);

    store.description = description;

    if (image && image.length > 0) {
      store.image = image;
    }

    await store.save();

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Store updated successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
