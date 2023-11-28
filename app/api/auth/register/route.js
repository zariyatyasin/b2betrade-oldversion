import { NextResponse } from "next/server";
import db from "../../../../utils/db";
import User from "../../../../model/User";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../../utils/sendEmail";
import { createActivationToken } from "../../../../utils/token";
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

    console.log(phoneNumber);

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
        { message: "Please Register", type: "register" },
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
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
