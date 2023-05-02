/** @type {import('next').NextConfig} */

const backendApi = `${process.env.NEXT_PUBLIC_BACKEND_API}/:path*`

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: backendApi },
    ]
  }
};

module.exports = nextConfig;
