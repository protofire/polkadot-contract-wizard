/** @type {import('next').NextConfig} */

const dotenv = require('dotenv')
const { version } = require('./package.json');
dotenv.config()

const backendApi = `${process.env.NEXT_PUBLIC_BACKEND_API}/:path*`

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    version,
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: backendApi }]
  }
}

module.exports = nextConfig
