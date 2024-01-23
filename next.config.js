/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
 },
};

module.exports = nextConfig;
