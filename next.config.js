/** @type {import('next').NextConfig} */
const { nanoid } = require('nanoid')
const crypto = require('crypto')

const hash = crypto.createHash('sha256')
hash.update(nanoid())
const nonce = hash.digest('base64')
const production = process.env.NODE_ENV === 'production'
const rpcUrl = production
  ? process.env.NEXT_PUBLIC_PROVIDER_SOCKET_PROD
  : process.env.NEXT_PUBLIC_PROVIDER_SOCKET_DEV

const ContentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  style-src 'self' 'unsafe-inline';
  script-src 'nonce-${nonce}' 'self' ${production ? '' : "'unsafe-eval'"};
  child-src  ${process.env.NEXT_PUBLIC_DOMAIN};
  font-src 'self';  
  connect-src ${rpcUrl} ${process.env.NEXT_PUBLIC_BACKEND_API} ${!production ? "'self'" : null}
`

const nextConfig = {
  reactStrictMode: true,
  // Adding policies:
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
        ]
      },
    ]
  }
}

module.exports = nextConfig
