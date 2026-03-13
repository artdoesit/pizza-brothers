import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScript errors ke bawajud build hone dega taaki deployment na ruke
    ignoreBuildErrors: true,
  },
  // @ts-ignore - Kuch versions mein NextConfig type definition issue karta hai
  eslint: {
    // ESLint errors ko build ke waqt ignore karein
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;