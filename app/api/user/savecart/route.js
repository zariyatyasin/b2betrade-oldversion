import { NextResponse } from "next/server";
import User from "../../../../model/User";
import Cart from "../../../../model/Cart";
import Product from "../../../../model/Product";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";


export const POST = async (request  ) => {
 
  const session = await getCurrentUser();
    if(!session){
    return NextResponse.json( "you must be login in" ,{
           status: 201,
         })
    }
    try {
    db.connectDb()
    const {cart} = await request.json();
  
     let products = [];
     let user = await User.findById(session.id);
     let existing_cart = await Cart.findOne({ user: user._id });
     if (existing_cart) {
      await Cart.findByIdAndRemove(existing_cart._id);
    }
    
     for (let i = 0; i < cart.length; i++) {
       let dbProduct = await Product.findById(cart[i]._id).lean();
       let subProduct = dbProduct.subProducts[cart[i].style];
       let tempProduct = {};
       tempProduct.name = dbProduct.name;
       tempProduct.product = dbProduct._id;
       tempProduct.color = {
         color: cart[i].color.color,
         image: cart[i].color.image,
       };
       tempProduct.image = subProduct.images[0].url;
       tempProduct.qty = Number(cart[i].qty);
       tempProduct.size = cart[i].size;
       let price = Number(
         subProduct.sizes.find((p) => p.size == cart[i].size).price
       );
       tempProduct.price =
         subProduct.discount > 0
           ? (price - price / Number(subProduct.discount)).toFixed(2)
           : price.toFixed(2);
 
       products.push(tempProduct);
     }
     let cartTotal = 0;
 
     for (let i = 0; i < products.length; i++) {
       cartTotal = cartTotal + products[i].price * products[i].qty;
     }
     await new Cart({
       products,
       cartTotal: cartTotal.toFixed(2),
       user: user._id,
     }).save();

     db.disconnectDb()
      return NextResponse.json( {cart} ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse(  err.message , { status: 500 });
    }
  };