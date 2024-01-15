import { NextResponse } from "next/server";

 
 
import db from "../../../../../../utils/db";
import HomeHero from "../../../../../../model/HomeHero";
 
export const PUT = async (request, { params }) => {
  try {
    db.connectDb();
    const { id } = params;

    const homeHero = await HomeHero.findById(id);

    
    if (!homeHero) {
      db.disconnectDb();
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
    }

 
    homeHero.active = !homeHero.active;

 
    await homeHero.save();


    db.disconnectDb();
    return NextResponse.json(
      {
        message: " successfully Updated!",
        
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
