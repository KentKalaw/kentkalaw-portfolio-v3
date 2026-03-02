import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 80],
  },
  turbopack: {},
};

export default nextConfig;