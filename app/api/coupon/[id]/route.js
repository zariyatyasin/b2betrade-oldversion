import { NextResponse } from "next/server";

 
import db from "../../../../utils/db";
 
import Coupon from "../../../../model/Coupon";
import Category from "../../../../model/Category";
export const GET = async (request , { params } ) => {
 
 
    try {
     db.connectDb()
     const { id } = params;

     const coupon = await Coupon.findById(id).populate({ path: "applicableCategories", model: Category });
       db.disconnectDb()
      return NextResponse.json( {
        coupon:coupon
      } ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err}, { status: 500 });
    }
  };
  export const DELETE = async (request, { params }) => {
    try {
      db.connectDb();
      const { id } = params;
  
      const deletedCoupon = await Coupon.findByIdAndRemove(id);
  
      if (!deletedCoupon) {
        return NextResponse.json(
          {
            message: "Coupon not found",
          },
          {
            status: 404,
          }
        );
      }
  
      db.disconnectDb();
      return NextResponse.json(
        {
          message: "Coupon deleted successfully !",
          coupon: await Coupon.find({}).sort({ updatedAt: -1 }),
        },
        {
          status: 200,
        }
      );
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  };
  