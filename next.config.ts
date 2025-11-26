import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.collegeinfonepal.com",
      },
    ],
  },

  // cacheComponents: true,
};

export default nextConfig;
