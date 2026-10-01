import type { NextConfig } from "next";

/**
 * Remote media hosts. Your own photos live in /public/images and need no entry.
 * i.ytimg.com serves the YouTube thumbnails.
 */
const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // Required in Next 16: only these optimizer qualities are allowed.
    qualities: [50, 75, 90],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  experimental: {
    // Safety net for barrel-imported packages: rewrite them to direct module
    // paths so only what is used reaches the client bundle.
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;