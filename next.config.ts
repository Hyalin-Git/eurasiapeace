import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations légères
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
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
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },
};

export default nextConfig;
