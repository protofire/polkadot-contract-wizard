/** @type {import('next').NextConfig} */

const backendApi = `/:path*`

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: backendApi },
    ]
  }
};

module.exports = nextConfig;
