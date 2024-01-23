
import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../utils/session";
import User from "../../../../../model/User";
import db from "../../../../../utils/db";

export const DELETE = async (request ,{ params } ) => {
   
    const session = await getCurrentUser();
    
   
      try {
        await db.connectDb()
        const { id } = params;
   
        
   
        const user = await User.findById(session.id);
        await user.updateOne(
            {
              $pull: { address: { _id: id } },
            },
            { new: true }
          );
       
        db.disconnectDb();
        
   
      
   
        return NextResponse.json(   user.address.filter((a) => a._id != id) ,{
          status: 201,
        })
      } catch (err) {
        return new NextResponse({message:err.message}, { status: 500 });
      }
    };