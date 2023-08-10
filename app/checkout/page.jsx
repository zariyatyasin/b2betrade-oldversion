import React from "react";
import { getCurrentUser } from "../../utils/session";
import { redirect } from "next/navigation";
import db from "../../utils/db";
import User from "../../model/User";
import Cart from "../../model/Cart";
import Header from "../../components/cart/Header";
import Checkout from "../../components/checkout/Checkout";
async function getCart() {
  db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  const user = await User.findById(session.id);
  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    redirect("/cart ");
  }
  db.disconnectDb();

  return {
    cart: JSON.parse(JSON.stringify(cart)),
    user: JSON.parse(JSON.stringify(user)),
  };
}

export default async function page() {
  const { cart, user } = await getCart();

  return (
    <div>
      <Header />
      <div>
        <Checkout cart={cart} user={user} />
      </div>
    </div>
  );
}
