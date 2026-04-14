import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Improve performance (faster crawl)
  compress: true,

  // ✅ Enable image optimization (important for SEO)
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // ✅ Experimental performance boost
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // ✅ Add security + SEO headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;