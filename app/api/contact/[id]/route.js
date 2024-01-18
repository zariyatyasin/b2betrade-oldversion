// pages/api/messages/[id].js

import { NextResponse } from "next/server";
import db from "../../../../utils/db";
import Contact from "../../../../model/Contact";

export const DELETE = async (request, { params }) => {
  try {
    db.connectDb();

    const { id } = params;
    await Contact.findByIdAndDelete(id);

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
