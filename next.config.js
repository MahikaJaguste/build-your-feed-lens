/** @type {import('next').NextConfig} */

// const webpack = require('webpack')
// const { parsed: myEnv } = require('dotenv').config()

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
  // webpack(config) {
  //   config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
  //   return config
  // },
}

module.exports = nextConfig
