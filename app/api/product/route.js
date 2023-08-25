import { NextResponse } from "next/server";
import Product from "../../../model/Product";
import db from "../../../utils/db";
 

export const GET = async (request  ) => {
 
 
    try {
     db.connectDb()
  let products = await Product.find().sort({ createdAt: -1 }).lean();
       db.disconnectDb()
      return NextResponse.json( {
        products: products
      } ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err}, { status: 500 });
    }
  };