const bytes = await image.arrayBuffer();
const buffer = Buffer.from(bytes);
const filePath = path.join(process.cwd(), "public/uploads", image.name);
console.log(filePath);
await writeFile(filePath, buffer);

const response = await cloudinary.uploader.upload(filePath);

console.log(response);
