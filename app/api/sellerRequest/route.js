import { NextResponse } from "next/server";
 
import db from "../../../utils/db"
import SellerRequest from "../../../model/SellerRequest";
 import {getCurrentUser} from "../../../utils/session"
 
 

export const POST = async (request  ) => {
    const session = await getCurrentUser();
    if (!session) {
      return new NextResponse.json("You must be logged in", {
        status: 201,
      });
    }
  
    try {
    db.connectDb();
  
      const requestData = await request.json();
    
 

      const newRequest = new SellerRequest( requestData );
  
      await newRequest.save();
  
     db.disconnectDb();
  
     return NextResponse.json(
        {
          message: "RequestProduct created successfully !",
          
        },
        {
          status: 201,
        }
      );
    } catch (err) {
      
        return new NextResponse(err, { status: 500 });
    }
  };
