import { NextResponse } from "next/server";
 
import db from "../../../utils/db"
import Coupon from "../../../model/Coupon";
 import {getCurrentUser} from "../../../utils/session"
 

export const POST = async (request  ) => {
  const session = await getCurrentUser();

  // if(!session){
  //   return NextResponse.json( "you must be login in" ,{
  //          status: 201,
  //        })
  //   }
 
    try {
    db.connectDb()
 
 
   
    const { coupon, startDate, endDate, discount } =  await request.json();
    const test = await Coupon.findOne({ coupon });
    if (test) {
        return NextResponse.json( "This Coupon name already exists, try with a different name" ,{
            status: 400,
          })
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

   

     db.disconnectDb()
      return NextResponse.json(  {  
        message: "Coupon created successfully !",
        coupons: await Coupon.find({}), } ,{
        status: 201,
      })


     
    } catch (err) {
      return new NextResponse({message:err.message}, { status: 500 });
    }
  };