import { NextResponse } from "next/server";

import db from "../../../../utils/db";
import User from "../../../../model/User";
import Store from "../../../../model/Store";
import bcrypt from "bcrypt";
export const POST = async (request) => {
  try {
    db.connectDb();
    const {
      name,
      role,
      storeName,
      address,
      email,
      phoneNumber,
      password,
      category,
      subCategories,
      description,
      ShopAddress,
    } = await request.json();

    const user = await User.findOne({ phoneNumber });
    if (user) {
      return NextResponse.json(
        { message: "This phone number already exsits." },
        {
          status: 400,
        }
      );
    }

    if (email !== "") {
      const Findemail = await User.findOne({ email });
      if (Findemail) {
        return NextResponse.json(
          { message: "This email already exists." },
          {
            status: 400,
          }
        );
      }
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const savedUser = await new User({
      name,

      role,
      password: cryptedPassword,
      phoneNumber,
    }).save();

    const CreateStore = await new Store({
      storeName,
      owner: savedUser._id,
      address,
      category,
      ShopAddress,
      subCategories,
      description,
    }).save();

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Store created successfully !",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
