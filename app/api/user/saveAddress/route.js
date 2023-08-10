import { NextResponse } from "next/server";
 
import db from "../../../../utils/db";
import User from "../../../../model/User";
import {getCurrentUser} from "../../../../utils/session"
 

export const POST = async (request  ) => {
  const session = await getCurrentUser();

  if(!session){
    return NextResponse.json( "you must be login in" ,{
           status: 201,
         })
    }
 
    try {
    db.connectDb()
    const {address} = await request.json();
 
    const user = await User.findById(session.id);
    await user.updateOne({
      $push: {
        address: address,
      },
    });

   
     db.disconnectDb()
      return NextResponse.json( address ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err.message}, { status: 500 });
    }
  };