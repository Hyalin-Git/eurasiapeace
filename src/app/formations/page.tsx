"use server";

import {
  getNiveauxDeFormation,
  getRythmesDeFormation,
  getTypesDeFormations,
} from "@/features/formations/server/db/formations";
import Banner from "@/components/Banner";
import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import { Formations } from "@/features/formations/components/Formations";
import { Suspense } from "react";
import { FormationsSkeletons } from "@/features/formations/components/FormationSkeletons";
import Paginations from "@/components/pagination/Paginations";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Récupérer les types, niveaux et rythmes de formations pour les mots-clés
  const [niveauxRes, typesRes, rythmesRes] = await Promise.all([
    getNiveauxDeFormation(),
    getTypesDeFormations(),
    getRythmesDeFormation(),
  ]);

  const { data: niveauxDeFormation } = niveauxRes;
  const { data: typesDeFormation } = typesRes;
  const { data: rythmesDeFormation } = rythmesRes;

  // Extraire les noms pour les mots-clés
  const typeNames =
    typesDeFormation?.map(
      (type: { name: string; slug: string }) => type.name
    ) || [];
  const niveauNames =
    niveauxDeFormation?.map(
      (niveau: { name: string; slug: string }) => niveau.name
    ) || [];
  const rythmeNames =
    rythmesDeFormation?.map(
      (rythme: { name: string; slug: string }) => rythme.name
    ) || [];

  const keywords = [
    "formations",
    "formation géopolitique",
    "centre de formation",
    "formation interdisciplinaire",
    "Eurasie",
    "géopolitique",
    "recherche",
    "think-tank",
    "formation professionnelle",
    "éducation géopolitique",
    "formation continue",
    "apprentissage",
    ...typeNames,
    ...niveauNames.slice(0, 5), // Limiter pour éviter la surcharge
    ...rythmeNames.slice(0, 5),
  ];

  return {
    title: "Formations",
    description:
      "Découvrez notre centre de formation interdisciplinaire. Catalogue diversifié de formations proposées par des chercheurs et professionnels experts en géopolitique eurasiatique.",
    keywords,
    openGraph: {
      title: "Formations | EurasiaPeace",
      description:
        "Formez-vous avec notre centre de formation. Formations interdisciplinaires dispensées par des experts en eurasiatique.",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
          width: 1200,
          height: 630,
          alt: "Formations EurasiaPeace - Centre de formation interdisciplinaire",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Formations | EurasiaPeace",
      description:
        "Catalogue de formations interdisciplinaires proposées par des experts et chercheurs.",
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
}

export default async function FormationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    niveau: string;
    rythme: string;
    search: string;
    page: string;
  }>;
}) {
  const { category, niveau, rythme, search, page } = await searchParams;

  const categoryTerms = category ? category.split(",") : [];
  const niveauTerms = niveau ? niveau.split(",") : [];
  const rythmeTerms = rythme ? rythme.split(",") : [];

  const filters = {
    category: {
      taxonomy: "TYPEDEFORMATION",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    niveau: {
      taxonomy: "NIVEAUDEFORMATION",
      field: "SLUG",
      terms: niveauTerms || [],
    },
    rythme: {
      taxonomy: "RYTHMEDEFORMATION",
      field: "SLUG",
      terms: rythmeTerms || [],
    },
  };

  const [niveauxDeFormationRes, typesDeFormationRes, rythmesDeFormationRes] =
    await Promise.all([
      getNiveauxDeFormation(),
      getTypesDeFormations(),
      getRythmesDeFormation(),
    ]);

  const { data: niveauxDeFormation } = niveauxDeFormationRes;
  const { data: typesDeFormation } = typesDeFormationRes;
  const { data: rythmesDeFormation } = rythmesDeFormationRes;

  const bannerProps = {
    title: "Nos formations",
    content:
      "Le Centre de formation interdisciplinaire d'EurasiaPeace à dominante géopolitique  regroupe des chercheurs et professionnels  pour proposer un catalogue de formation diversifié en cours d'élaboration et qui s'oriente autour de plusieurs axes distincts, complémentaires et cohérents avec l'activité de recherche de notre think-tank.",
    src: "/banner/formation-banner.webp",
  };

  const offset = page ? (parseInt(page) - 1) * 9 : 0;

  return (
    <div>
      <Banner BannerProps={bannerProps} />
      <div className="container py-10">
        <Filters filters={filters}>
          <div className="flex flex-col gap-4">
            <span className="text-md text-text-primary font-bold">
              Catégories
            </span>
            <FiltersItems items={typesDeFormation} query="category" />
            <span className="text-md text-text-primary font-bold">Niveaux</span>
            <FiltersItems items={niveauxDeFormation} query="niveau" />
            <span className="text-md text-text-primary font-bold">Rythmes</span>
            <FiltersItems items={rythmesDeFormation} query="rythme" />
          </div>
        </Filters>

        <Suspense fallback={<FormationsSkeletons count={9} />}>
          <Formations
            count={9}
            search={search}
            filters={filters}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + niveau + rythme + "formations"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="formations"
            limit={9}
            filters={filters}
            search={search}
            offset={offset}
          />
        </Suspense>
      </div>
    </div>
  );
}
