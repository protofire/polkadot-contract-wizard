/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers () { 
    return [{
      source: '/(.*)',
      headers: [{
        key: 'Content-Security-Policy',
        value:
          `default-src 'self'; script-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_API}; `,
        }
      ]
    }]
  }
};

module.exports = nextConfig;
