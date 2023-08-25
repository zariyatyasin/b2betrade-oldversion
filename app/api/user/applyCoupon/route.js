import { NextResponse } from "next/server";
 
import db from "../../../../utils/db";
import User from "../../../../model/User";
import Coupon from "../../../../model/Coupon";
import Cart from "../../../../model/Cart";
import {getCurrentUser} from "../../../../utils/session"
 

export const POST = async (request  ) => {
  const session = await getCurrentUser();

  if(!session){
    return NextResponse.json( "you must be login in" ,{
           status: 400,
         })
    }
 
    try {
    db.connectDb()
    const {coupon} = await request.json();
    const user = await User.findById(session.id);
    const checkCoupon = await Coupon.findOne({coupon})
    if(checkCoupon == null){
      return NextResponse.json(  {  message:"Invalid Coupon" } ,{
        status: 201,
      })
    }
 
   let  {cartTotal} = await Cart.findOne({user:session.id})
   let totalAfterDiscount =
   cartTotal - (cartTotal * checkCoupon.discount) / 100;

 await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

    
 
     db.disconnectDb()
      return NextResponse.json(  {  
        totalAfterDiscount: totalAfterDiscount.toFixed(2),
        discount: checkCoupon.discount, } ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err.message}, { status: 500 });
    }
  };