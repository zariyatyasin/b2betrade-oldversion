import { NextResponse } from "next/server";
import db from "../../../../../utils/db";
import { getCurrentUser } from "../../../../../utils/session";
import bcrypt from "bcrypt";
import User from "../../../../../model/User";

export const PUT = async (request, { params }) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 201,
    });
  }

  try {
    db.connectDb();
    const { id } = params;

    const editedData = await request.json();

    if (editedData.password) {
      editedData.password = await bcrypt.hash(editedData.password, 12);
    }
    const updatedOrder = await User.findByIdAndUpdate(id, editedData, {
      new: true,
    });
    const newUpdateduser = await User.findById(updatedOrder._id);

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Order updated successfully!",
        newUpdateduser,
      },
      { status: 200 }
    );
  } catch (err) {
  
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
