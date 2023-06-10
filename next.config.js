const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextTranslate(nextConfig);
