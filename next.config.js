/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: '/:path*' },
    ]
  }
};

module.exports = nextConfig;
