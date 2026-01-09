import Banner from "@/components/banners/Banner";
import Section from "@/components/Section";
import Newsletter from "@/features/newsletter/components/Newsletter";
import { Bell, CheckCircle2, MailOpen, Shield, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - EurasiaPeace",
  description:
    "Recevez nos analyses, veilles géopolitiques et publications directement dans votre boîte mail. 1 à 2 emails par mois, sans spam.",
  keywords: [
    "newsletter",
    "abonnement newsletter",
    "analyses",
    "veilles géopolitiques",
    "publications",
    "formations",
    "EurasiaPeace",
    "think tank",
    "Eurasie",
    "géopolitique",
    "actualité",
    "email",
  ],
  openGraph: {
    title: "Newsletter - EurasiaPeace",
    description:
      "Abonnez-vous pour recevoir nos analyses, veilles géopolitiques et publications. 1 à 2 emails par mois.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "Newsletter EurasiaPeace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter - EurasiaPeace",
    description:
      "Recevez nos analyses, veilles géopolitiques et publications directement dans votre boîte mail.",
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

export default async function NewsletterPage() {
  const BannerProps = {
    title: "Newsletter",
    content:
      "Recevez nos analyses, veilles géopolitiques et publications directement dans votre boîte mail.",
    src: "/banner/publications-banner.webp",
  };

  return (
    <div>
      <Banner BannerProps={BannerProps} />
      <div className="container pb-20">
        <Section
          icon={
            <MailOpen
              className={`h-12 w-12 p-2 text-text-primary rounded-md bg-linear-to-br from-btn-force-blue/40`}
            />
          }
          title="Restez informé en priorité"
          description="Abonnez-vous pour recevoir nos contenus clés : analyses, veilles géopolitiques et informations sur nos formations."
          className="pt-0"
        >
          <Newsletter />
        </Section>
      </div>
    </div>
  );
}
