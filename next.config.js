/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['i.imgur.com', 'picsum.photos'],
  }
}

module.exports = nextConfig
