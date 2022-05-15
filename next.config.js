/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['i.imgur.com', 'picsum.photos'], //TODO: Remove for production
  }
}

module.exports = nextConfig
