import { NextResponse } from "next/server";
import db from "../../../../utils/db";
import User from "../../../../model/User";
import { getCurrentUser } from "../../../../utils/session";

export const POST = async (request) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 400,
    });
  }

  try {
    await db.connectDb();
    const { address } = await request.json();

    const user = await User.findById(session.id);

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    let updatedAddressArray;

    if (user.address.length === 0) {
      // If the user has no addresses, set the 'active' property of the first added address to true
      updatedAddressArray = [{ ...address, active: true }];
    } else {
      // If the user already has addresses, add the new address without changing the 'active' property
      updatedAddressArray = [...user.address, address];
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.id,
      { $set: { address: updatedAddressArray } },
      { new: true }
    );

    db.disconnectDb();

    return NextResponse.json(
      { addresses: updatedUser.address },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse({ message: err.message }, { status: 500 });
  }
};
