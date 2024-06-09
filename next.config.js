/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cashless-files.ams3.cdn.digitaloceanspaces.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cashless-files.ams3.digitaloceanspaces.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["api.ascolines.com"],
    },
  },
};

module.exports = nextConfig;
