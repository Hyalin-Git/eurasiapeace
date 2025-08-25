import CommitteMembers from "@/features/about/components/CommitteeMembers";
import { CommitteesMemberSkeletons } from "@/features/about/components/CommitteeMemberSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comité d'Édition - EurasiaPeace",
  description:
    "Découvrez le Comité d'Édition d'EurasiaPeace, garants de l'excellence éditoriale. Experts et académiques spécialisés en géopolitique eurasiatique qui supervisent nos publications et analyses.",
  keywords: [
    "comité d'édition",
    "comité éditorial",
    "excellence éditoriale",
    "EurasiaPeace",
    "experts géopolitiques",
    "académiques",
    "spécialistes Eurasie",
    "supervision éditoriale",
    "publications géopolitiques",
    "analyses",
    "think-tank",
    "recherche académique",
    "expertise éditoriale",
    "géopolitique eurasiatique",
    "conseil éditorial",
    "qualité éditoriale",
    "comité scientifique",
  ],
  openGraph: {
    title: "Comité d'Édition - EurasiaPeace",
    description:
      "Rencontrez les experts du Comité d'Édition d'EurasiaPeace qui garantissent l'excellence de nos publications géopolitiques sur l'Eurasie.",
    type: "website",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
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
    card: "summary_large_image",
    title: "Comité d'Édition - EurasiaPeace",
    description:
      "Experts et académiques du Comité d'Édition garantissant l'excellence de nos publications géopolitiques.",
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

export default function ComiteEdition() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-headband py-12">
        <div className="container px-4">
          <div className="text-center">
            <h1 className="text-white font-playfair font-bold mb-4">
              Comité d&apos;Édition
            </h1>
            <p className="text-lg md:text-xl text-white">
              Les garants de l&apos;excellence éditoriale d&apos;EurasiaPeace
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-6xl px-4 py-12">
        <Suspense fallback={<CommitteesMemberSkeletons count={6} />}>
          <CommitteMembers committeeType="Comité d'édition" />
        </Suspense>
      </div>
    </div>
  );
}
