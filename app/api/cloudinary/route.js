import { NextResponse } from "next/server";
import multer from "multer";

// Configure multer to specify where to store uploaded files
const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
};

export const POST = async (req) => {
  try {
    upload.array("files")(req, res, async (err) => {
      if (err) {
        throw new Error("Error uploading files");
      }
      // ... rest of the code
    });

    const { files } = req;
    return NextResponse.json(
      {
        files,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse({ message: err.message }, { status: 500 });
  }
};
