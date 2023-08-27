import { NextResponse } from "next/server";
 
import db from "../../../../utils/db"
 
 import {getCurrentUser} from "../../../../utils/session"
import User from "../../../../model/User";
 
import Order from "../../../../model/Order"
export const POST = async (request  ) => {
  const session = await getCurrentUser();

  if(!session){
    return NextResponse.json( "you must be login in" ,{
           status: 201,
         })
    }
 
    try {
    db.connectDb()
 
 
   
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }  =  await request.json();
    
    const user = await User.findById( session.id);

    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
     db.disconnectDb()
      return NextResponse.json(  {  
        order_id: newOrder._id,
        } ,{
        status: 201,
      })


     
    } catch (err) {
      return new NextResponse({message:err.message}, { status: 500 });
    }
  };