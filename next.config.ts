import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }] },
};

export default config;
