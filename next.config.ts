import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Prevent Sanity Studio from being statically rendered during build
  serverExternalPackages: ["sanity", "@sanity/client", "@sanity/image-url"],
};

export default nextConfig;
