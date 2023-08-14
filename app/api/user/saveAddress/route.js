import { NextResponse } from "next/server";
 
import db from "../../../../utils/db";
import User from "../../../../model/User";
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
    const {address} = await request.json();
 
   
    const user = await User.findByIdAndUpdate(
      session.id,
      { $push: { address: address } },
      { new: true }
    );
    
 
     db.disconnectDb()
      return NextResponse.json(  { addresses: user.address } ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err.message}, { status: 500 });
    }
  };