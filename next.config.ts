import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations légères
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: "https://api-eura.akdigital.fr/wp-content/uploads/:path*",
      },
    ];
  },

  images: {
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "eurasiapeace.localwp",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.21",
        port: "8085",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "eurasiapeace.akdigital.fr",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "eurasiapeace.akdigital.fr",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
      {
        protocol: "https",
        hostname: "api-eura.akdigital.fr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
