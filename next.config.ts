import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScript errors ke bawajud build hone dega
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  eslint: {
    // ESLint errors ko build ke waqt ignore karein
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;