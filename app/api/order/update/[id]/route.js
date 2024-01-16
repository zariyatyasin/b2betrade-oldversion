import { NextResponse } from "next/server";
import db from "../../../../../utils/db";
import { getCurrentUser } from "../../../../../utils/session";
import Order from "../../../../../model/Order";
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

    const updatedOrder = await Order.findByIdAndUpdate(id, editedData, {
      new: true,
    });
    const newUpdatedOrder = await Order.findById(updatedOrder._id).populate({
      path: "user",
      model: User,
    });

    db.disconnectDb();

    return NextResponse.json(
      {
        message: "Order updated successfully!",
        newUpdatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
