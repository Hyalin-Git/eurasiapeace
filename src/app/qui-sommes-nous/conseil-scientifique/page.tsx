import CommitteMembers from "@/features/about/components/CommitteeMembers";
import { CommitteesMemberSkeletons } from "@/features/about/components/CommitteeMemberSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conseil Scientifique - EurasiaPeace",
  description:
    "Découvrez le Conseil Scientifique d'EurasiaPeace, garants de la rigueur académique. Chercheurs et experts qui supervisent la qualité scientifique de nos recherches géopolitiques sur l'Eurasie.",
  keywords: [
    "conseil scientifique",
    "rigueur académique",
    "EurasiaPeace",
    "chercheurs",
    "experts scientifiques",
    "spécialistes Eurasie",
    "supervision scientifique",
    "recherche géopolitique",
    "qualité scientifique",
    "think-tank",
    "recherche académique",
    "expertise scientifique",
    "géopolitique eurasiatique",
    "comité scientifique",
    "académiques",
    "validation scientifique",
    "méthodologie de recherche",
  ],
  openGraph: {
    title: "Conseil Scientifique - EurasiaPeace",
    description:
      "Rencontrez les chercheurs et experts du Conseil Scientifique d'EurasiaPeace qui garantissent la rigueur de nos recherches géopolitiques.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "EurasiaPeace - Centre de Réflexion sur la Paix en Eurasie",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Conseil Scientifique - EurasiaPeace",
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`],
    description:
      "Chercheurs et experts du Conseil Scientifique garantissant la rigueur académique de nos recherches géopolitiques.",
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

export default function ConseilScientifique() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-headband py-12">
        <div className="container px-4">
          <div className="text-center">
            <h1 className="text-white font-bold mb-4">Conseil Scientifique</h1>
            <p className="text-lg md:text-xl text-white">
              Les garants de la rigueur académique d&apos;EurasiaPeace
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-6xl px-4 py-12">
        <Suspense fallback={<CommitteesMemberSkeletons count={6} />}>
          <CommitteMembers committeeType="Conseil scientifique" />
        </Suspense>
      </div>
    </div>
  );
}
