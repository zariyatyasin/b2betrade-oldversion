import { NextResponse } from "next/server";
import db from "../../../utils/db";

import { getCurrentUser } from "../../../utils/session";
import SendInquiry from "../../../model/SendInquiry ";
export const POST = async (request) => {
  try {
    db.connectDb();
    const session = await getCurrentUser();
    if (!session) {
      return new NextResponse.json("You must be logged in", {
        status: 201,
      });
    }

    const { quantity, details, productId, storeId, image } =
      await request.json();

    const newSendInquiry = new SendInquiry({
      quantity,
      details,
      productId,
      storeId,
      image,
      userId: session.id,
    });
    await newSendInquiry.save();
    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Form submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
