import { NextResponse } from "next/server";
import db from "../../../../../utils/db";
import bcrypt from "bcrypt";
import User from "../../../../../model/User";

export const PUT = async (request, { params }) => {
  try {
    await db.connectDb();
    const { id } = params;

    const { password } = await request.json();
    console.log(password);
    const user = await User.findOne({ phoneNumber: id });

    if (!user) {
      return NextResponse.json(
        {
          message: "No Phone Number Found",
        },
        { status: 400 }
      );
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      await user.save();
    }

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Password updated successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
