import { NextResponse } from "next/server";
import multer from "multer";

 
const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
};

export const POST = async (req) => {
  try {
 

 
    return NextResponse.json(
      {
        files:"Je",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse({   err  }, { status: 500 });
  }
};
