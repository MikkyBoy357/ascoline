/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ascoline-files.s3.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "13.41.57.233:3001",
        "localhost:3001",
        "13.41.57.233:3000",
      ],
    },
  },
};

module.exports = nextConfig;
