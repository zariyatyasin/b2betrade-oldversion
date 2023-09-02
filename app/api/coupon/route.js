import { NextResponse } from "next/server";
 
import db from "../../../utils/db"
 
 import {getCurrentUser} from "../../../utils/session"
import Coupon from "@/model/Coupon";
 

export const POST = async (request  ) => {
  const session = await getCurrentUser();

  // if(!session){
  //   return NextResponse.json( "you must be login in" ,{
  //          status: 201,
  //        })
  //   }
 
    try {
    db.connectDb()
 
 
   
    const {
      coupon,
      startDate,
      endDate,
      discount,
      minAmount,
      maxUsesTotal,
      maxUsesPerUser,
      applicableProducts,
      applicableCategories,
      discountType,
    } = await request.json();


    console.log(coupon);

    const test = await Coupon.findOne({ coupon });
    if (test) {
        return NextResponse.json( {message:"This Coupon name already exists, try with a different name"} ,{
            status: 400,
          })
    }
 
    const newCouponData = new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
      minAmount,
      maxUsesTotal,
      maxUsesPerUser,
      applicableProducts,
      applicableCategories,
      discountType,
    });
    await newCouponData.save();

    

     db.disconnectDb()
     return NextResponse.json(
      {
        message: "Coupon created successfully !",
        coupon: await Coupon.find({}).sort({ updatedAt: -1 }),
      },
      {
        status: 201,
      }
    );


     
    } catch (err) {
      console.log(err.message);
      return new NextResponse(err, { status: 500 });
    }
  };

export const PUT = async (request  ) => {
  const session = await getCurrentUser();

  // if(!session){
  //   return NextResponse.json( "you must be login in" ,{
  //          status: 201,
  //        })
  //   }
 
    try {
    db.connectDb()
 
 
   
    const {
      id,
      coupon,
      startDate,
      endDate,
      discount,
      minAmount,
      maxUsesTotal,
      maxUsesPerUser,
      applicableProducts,
      applicableCategories,
      discountType,
    } = await request.json();


    console.log(coupon);

 
   console.log("this",id);
 
  await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
      minAmount,
      maxUsesTotal,
      maxUsesPerUser,
      applicableProducts,
      applicableCategories,
      discountType,
    });
 

     db.disconnectDb()
     return NextResponse.json(
      {
        message: "Coupon updated successfully !",
        coupon: await Coupon.find({}).sort({ updatedAt: -1 }),
      },
      {
        status: 201,
      }
    );


     
    } catch (err) {
      console.log(err.message);
      return new NextResponse(err, { status: 500 });
    }
  };