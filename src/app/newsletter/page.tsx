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
          <div className="flex flex-col w-full gap-20">
            <div className="rounded-xl border border-midnight-green/10 bg-linear-to-br from-btn-force-blue/5 to-transparent p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-text-primary" />
                <h3 className="font-semibold">Pourquoi s&apos;abonner ?</h3>
              </div>
              <p className="text-black/70 mb-6">
                Une sélection soignée de nos dernières analyses et veilles.
                Idéal pour suivre l&apos;essentiel de l&apos;actualité
                géopolitique et nos temps forts.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-btn-force-blue mt-0.5" />
                  <div>
                    <p className="font-medium">Analyses et publications clés</p>
                    <p className="text-black/70 text-sm">
                      Une vue d&apos;ensemble des contenus à ne pas manquer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-btn-force-blue mt-0.5" />
                  <div>
                    <p className="font-medium">Veilles géopolitiques</p>
                    <p className="text-black/70 text-sm">
                      Décryptages concis des évolutions majeures.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-btn-force-blue mt-0.5" />
                  <div>
                    <p className="font-medium">Agenda & formations</p>
                    <p className="text-black/70 text-sm">
                      Événements, sessions et nouveautés de nos programmes.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-black/70">
                  <Shield className="text-midnight-green" size={18} />
                  <span>Protection des données</span>
                </div>
                <div className="flex items-center gap-2 text-black/70">
                  <Bell className="text-midnight-green" size={18} />
                  <span>1 à 2 emails / mois</span>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Newsletter />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
