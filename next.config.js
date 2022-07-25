/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "ipfs.infura.io",
      "ipfs.io",
      "statics-mumbai-bean-staging.s3.eu-west-1.amazonaws.com",
      "res.cloudinary.com"
    ],
  },
}

module.exports = nextConfig
