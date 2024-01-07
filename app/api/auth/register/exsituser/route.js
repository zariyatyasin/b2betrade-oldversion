import { NextResponse } from "next/server";
import db from "../../../../../utils/db";
import User from "../../../../../model/User";

export async function POST(request) {
  try {
    await db.connectDb();
    const { phoneNumber, password } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      return NextResponse.json(
        { message: "User exists & Please Enter your Password", type: "login" },
        {
          status: 200,
        }
      );
    }
    if (!user) {
      return NextResponse.json(
        {
          message: "This Phone Number doesn't exist. Please Register",
          type: "register",
        },
        {
          status: 200,
        }
      );
    }

    await db.disconnectDb();

    return NextResponse.json(
      "Register success! Please activate your email to start.",
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
