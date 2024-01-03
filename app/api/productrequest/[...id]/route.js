import { NextResponse } from "next/server";
 
import db from "../../../../utils/db"
import RequestProduct from "../../../../model/RequestProduct";
 import {getCurrentUser} from "../../../../utils/session"


 // delete buyer requested product


export const DELETE = async (request,{ params }  ) => {
    const { id } = params;

 

   

        
  
 
    
  
      const session = await getCurrentUser();
      if (!session) {
        return new NextResponse.json("You must be logged in", {
          status: 201,
        });
      }else if(session.id !== id[1]){
        return new NextResponse.json("You can't delete", {
          status: 201,
        });
      }
    
      try {
      db.connectDb();
    
 await RequestProduct.findByIdAndRemove(id);


      // if (!requestToDelete || requestToDelete.userId !== session.id) {
      //   return res.status(403).json({ message: 'Unauthorized' });
      // }
       db.disconnectDb();
    
       return NextResponse.json(
          {
            message: "RequestProduct Deleted successfully !",
            
          },
          {
            status: 201,
          }
        );
      } catch (error) {
        
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    };
  