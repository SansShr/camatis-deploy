import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { proxyTimeout: 180000 },
  async rewrites() {
    const backendUrl = (process.env.BACKEND_URL || "http://127.0.0.1:8001").replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
};

export default nextConfig;
