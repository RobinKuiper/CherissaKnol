/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportTrailingSlash: true,
  trailingSlash: true,
  images: {
    domains: ['i.imgur.com'],
  }
}

module.exports = nextConfig
