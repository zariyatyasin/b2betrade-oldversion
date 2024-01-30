import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { getCurrentUser } from "../../../utils/session";
import fs from "fs/promises";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const allowedFileTypes = ["jpg", "jpeg", "png", "webp"];
// const maxFileSize = 5 * 1024 * 1024; // 5MB
const maxNumberOfFiles = 10;
export const POST = async (request) => {
  try {
    const session = await getCurrentUser();

    const data = await request.formData();
    const files = data.getAll("file");

    let images = [];

    for (const file of files) {
      const ext = file.name ? file.name.split(".").pop().toLowerCase() : "";

      if (ext && !allowedFileTypes.includes(ext)) {
        return NextResponse.json(`File type not allowed: ${file.name}`);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(
        process.cwd(),
        "/var/task/public/uploads",
        file.name
      );

      await writeFile(filePath, buffer);

      const response = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
      images.push({
        url: response.url,
        secure_url: response.secure_url,
        public_id: response.public_id,
      });

      await unlink(filePath);
    }

    return NextResponse.json(images, {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    const { public_id } = await request.json();

    if (!public_id) {
      return new NextResponse("Missing public_id", { status: 400 });
    }

    const deletionResponse = await cloudinary.uploader.destroy(public_id);

    if (deletionResponse.result !== "ok") {
      return new NextResponse("Failed to delete image", { status: 500 });
    }

    return new NextResponse("Image deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
