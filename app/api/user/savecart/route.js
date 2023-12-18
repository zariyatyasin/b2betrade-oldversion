import { NextResponse } from "next/server";
import User from "../../../../model/User";
import Cart from "../../../../model/Cart";
import Product from "../../../../model/Product";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";

export const POST = async (request) => {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 201,
    });
  }

  try {
    db.connectDb();
    const { cart } = await request.json();

    let products = [];
    let user = await User.findById(session.id);
    let existingCart = await Cart.findOneAndRemove({ user: user._id });

    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];

      let tempProduct = {
        product: dbProduct._id,
        name: dbProduct.name,
        image: subProduct.images[0].url,
        size: cart[i].size,
        qty: Number(cart[i].qty),
        color: {
          color: cart[i].color.color,
          image: cart[i].color.image,
        },
        price: subProduct.sizes.find((p) => p.size === cart[i].size).price,
      };

      products.push(tempProduct);
    }

    let cartTotal = products.reduce((total, product) => {
      const productTotal = product.price * product.qty;
      return isNaN(productTotal) ? total : total + productTotal;
    }, 0);
    cartTotal = parseFloat(cartTotal.toFixed(2));
    if (isNaN(cartTotal)) {
      throw new Error("Invalid cartTotal calculation");
    }

    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();

    db.disconnectDb();

    return NextResponse.json(
      { cart },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return new NextResponse(err.message, { status: 500 });
  }
};
