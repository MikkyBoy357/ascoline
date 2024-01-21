/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["13.41.57.233:3001", "localhost:3001"]
    }
  }
}

module.exports = nextConfig
