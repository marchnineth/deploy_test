import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Turbopack 비활성화 (한글 경로 문제 해결)
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
