import { NextResponse } from "next/server";
import User from "../../../../model/User";
import Cart from "../../../../model/Cart";
import Product from "../../../../model/Product";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";

const calculateBulkPrice = (productQty, bulkPricing, defaultPrice) => {
  for (const bulkPrice of bulkPricing) {
    if (productQty >= bulkPrice.minQty && productQty <= bulkPrice.maxQty) {
      return bulkPrice.price;
    }
  }
  return defaultPrice;
};
function calculatePrice(subProduct, size, qty) {
  const sizeInfo = subProduct.sizes.find((p) => p.size === size);

  // Check for bulk pricing
  const bulkPrice = sizeInfo.bulkPricing.find(
    (priceInfo) =>
      (priceInfo.minQty === null || qty >= priceInfo.minQty) &&
      (priceInfo.maxQty === null || qty <= priceInfo.maxQty)
  );

  return bulkPrice ? bulkPrice.price : sizeInfo.price;
}

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
      const hasNullPrice =
        dbProduct?.bulkPricing &&
        dbProduct?.bulkPricing.some((bulkPrice) => bulkPrice.price === null);
      let subProduct = dbProduct.subProducts[cart[i].style];

      let bulkPricing = dbProduct.bulkPricing || [];
      let productQty = Number(cart[i].qty);
      let tempProduct;
      // Calculate the price based on bulk pricing if available
      if (hasNullPrice) {
        tempProduct = {
          product: dbProduct._id,
          name: dbProduct.name,
          image: subProduct.images[0].url,
          size: cart[i].size,
          qty: Number(cart[i].qty),
          color: {
            color: cart[i].color.color,
            image: cart[i].color.image,
          },
          price: calculatePrice(subProduct, cart[i].size, cart[i].qty),
        };
      }
      if (!hasNullPrice) {
        let price = calculateBulkPrice(
          productQty,
          bulkPricing,
          subProduct.sizes.find((p) => p.size === cart[i].size).price
        );

        tempProduct = {
          product: dbProduct._id,
          name: dbProduct.name,
          image: subProduct.images[0].url,
          size: cart[i].size,
          qty: productQty,
          color: {
            color: cart[i].color.color,
            image: cart[i].color.image,
          },
          price: price,
        };
      }

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
    
    return new NextResponse(err.message, { status: 500 });
  }
};
