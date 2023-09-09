import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fs from "fs";
import fileUpload from "express-fileupload";
import multer from "multer";

import { createEdgeRouter } from "next-connect";

const router = createEdgeRouter();
router.post(async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    return NextResponse.json({ file });
  } catch (e) {
    const res = NextResponse.json({ error: e.message }, { status: 500 });
    return res;
  }
});

export async function POST(req) {
  return router.run(req);
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
    // Disallow body parsing, consume as stream; also for multer to do the parsing for dataForm
  },
};
