import { NextResponse } from "next/server";
 
import db from "../../../../utils/db";
import User from "../../../../model/User";
import {getCurrentUser} from "../../../../utils/session"
 

export const PUT = async (request  ) => {
  const session = await getCurrentUser();

  
 if(!session){
 return NextResponse.json( "you must be login in" ,{
        status: 201,
      })
 }
    try {
    db.connectDb()
    const {id} = await request.json();
    let user = await User.findById(session.id);
    let user_addresses = user.address;
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {



        
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true }
    );
      

   
     db.disconnectDb()

    
      return NextResponse.json( addresses  ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err.message}, { status: 500 });
    }
  };
 