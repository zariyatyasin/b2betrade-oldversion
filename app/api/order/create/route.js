import { NextResponse } from "next/server";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";
import User from "../../../../model/User";
import Order from "../../../../model/Order";

export const POST = async (request) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 201,
    });
  }

  try {
    db.connectDb();

    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = await request.json();

    const user = await User.findById(session.id);

    // Generate a unique order number based on the current timestamp
    const currentDate = new Date();
    const orderNumber = generateUniqueOrderNumber();

    const newOrder = await new Order({
      user: user._id,
      orderNumber,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    db.disconnectDb();

    return NextResponse.json(
      {
        order_id: newOrder._id,
        orderNumber: newOrder.orderNumber,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse({ message: err.message }, { status: 500 });
  }
};
function generateUniqueOrderNumber() {
  const min = 1000000; // 7-digit minimum value
  const max = 9999999; // 7-digit maximum value

  // Generate a random number within the specified range
  const orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return orderNumber.toString(); // Convert to string to ensure leading zeros are preserved
}
