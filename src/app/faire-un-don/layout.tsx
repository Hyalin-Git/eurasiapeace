import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faire un Don - EurasiaPeace",
  description:
    "Soutenez notre mission de recherche et de promotion de la paix en Eurasie. Dons déductibles à 66% des impôts. Recherche indépendante, formations et dialogue international. Paiement sécurisé.",
  keywords: [
    "don EurasiaPeace",
    "soutenir think-tank",
    "donation géopolitique",
    "recherche indépendante",
    "promotion de la paix",
    "Eurasie",
    "avantages fiscaux",
    "déduction impôts",
    "reçu fiscal",
    "paiement sécurisé",
    "dialogue international",
    "formation géopolitique",
    "transparence financière",
    "ONG géopolitique",
    "soutien recherche",
  ],
  openGraph: {
    title: "Faire un Don - EurasiaPeace",
    description:
      "Soutenez la recherche géopolitique indépendante et la promotion de la paix en Eurasie. Dons déductibles avec reçu fiscal automatique.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "Faire un don à EurasiaPeace - Soutenir la paix en Eurasie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faire un Don - EurasiaPeace",
    description:
      "Soutenez notre mission de recherche et promotion de la paix en Eurasie. Dons déductibles des impôts.",
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function FaireUnDonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
