/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;