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
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Prevent Sanity Studio from being statically rendered during build
  serverExternalPackages: ["sanity", "@sanity/client", "@sanity/image-url"],
};

export default nextConfig;
