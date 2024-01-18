import { NextResponse } from "next/server";
import db from "../../../utils/db";

import Contact from "../../../model/Contact";

export const POST = async (request) => {
  try {
    db.connectDb();

    const { fullName, phone, message } = await request.json();
    const newContact = new Contact({
      fullName,
      phone,
      message,
    });
    await newContact.save();
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
