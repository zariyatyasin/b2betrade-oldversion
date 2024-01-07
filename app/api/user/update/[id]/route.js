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

    if (editedData.oldPassword && editedData.newPassword) {
      const user = await User.findById(id);

      const oldPasswordMatches = await bcrypt.compare(
        editedData.oldPassword,
        user.password
      );

      if (!oldPasswordMatches) {
        return NextResponse.json(
          {
            message: "Old password does not match",
          },
          { status: 400 }
        );
      }

      editedData.password = await bcrypt.hash(editedData.newPassword, 12);
    }

    const updatedOrder = await User.findByIdAndUpdate(id, editedData, {
      new: true,
    });

    const newUpdateduser = await User.findById(updatedOrder._id);

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Updated successfully!",
        newUpdateduser,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
