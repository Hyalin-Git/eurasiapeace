import GoogleReCaptchaProvider from "@/context/GoogleReCaptchaProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe EurasiaPeace. Dialogue, coopération et échange avec lecteurs, partenaires, chercheurs et professionnels. Email : contact@eurasiapeace.org - Téléphone : +33 (0)6 37 36 36 99",
  keywords: [
    "contact EurasiaPeace",
    "contact think-tank",
    "dialogue géopolitique",
    "coopération",
    "échange",
    "partenaires",
    "chercheurs",
    "professionnels",
    "lecteurs",
    "géopolitique Eurasie",
    "expertise géopolitique",
    "collaboration",
    "networking",
    "think-tank contact",
  ],
  openGraph: {
    title: "Contact - EurasiaPeace",
    description:
      "Entrez en dialogue avec EurasiaPeace. Contactez notre équipe pour vos projets de coopération, recherche ou partenariat géopolitique.",
    type: "website",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "Contact EurasiaPeace - Dialogue et coopération",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - EurasiaPeace",
    description:
      "Contactez EurasiaPeace pour dialogue, coopération et échanges géopolitiques.",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GoogleReCaptchaProvider>{children}</GoogleReCaptchaProvider>;
}
