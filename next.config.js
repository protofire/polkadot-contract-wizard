/** @type {import('next').NextConfig} */

const dotenv = require('dotenv')
const { version } = require('./package.json');
dotenv.config()

const backendApi = `${process.env.NEXT_PUBLIC_BACKEND_API}/:path*`

const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  publicRuntimeConfig: {
    version,
  },
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.VERCEL_URL,
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: backendApi }]
  },
}

module.exports = nextConfig
