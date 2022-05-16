const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['i.imgur.com', 'picsum.photos'], //TODO: Remove for production
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (process.env.ANALYZE) {
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'server',
  //         analyzerPort: isServer ? 8888 : 8889,
  //         openAnalyzer: true,
  //       })
  //     )
  //   }
  //   return config
  // },
}

module.exports = withBundleAnalyzer(nextConfig)
