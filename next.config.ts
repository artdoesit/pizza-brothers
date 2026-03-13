// next.config.ts mein ye edit karein
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARNING !!
    // TypeScript errors ke bawajud build hone dega
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint errors ko build ke waqt ignore karein
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;