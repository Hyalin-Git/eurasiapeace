import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://eurasiapeace.org";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/mon-compte",
        "/checkout",
        "/checkout-payment",
        "/payment",
        "/verification",
        "/mot-de-passe-oublie",
        "/_next/",
        "/private/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
