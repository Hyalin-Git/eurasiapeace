"use server";

import Filters from "@/components/filters/Filters";
import { getGeopoliticalWatchesTypes } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import { getTags } from "@/features/posts/server/db/posts";
import Banner from "@/components/Banner";
import FiltersItems from "@/components/filters/FiltersItems";
import { Suspense } from "react";
import GeoWatches from "@/features/geopoliticalWatches/components/GeoWatches";
import { GeoWatchesSkeletons } from "@/features/geopoliticalWatches/components/GeoWatchesSkeletons";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import Paginations from "@/components/pagination/Paginations";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Récupérer les types de veilles géopolitiques pour les mots-clés
  const { data: geopoliticalWatchTypes } = await getGeopoliticalWatchesTypes();
  const { data: tags } = await getTags();

  // Extraire les noms des catégories et tags
  const categoryNames =
    geopoliticalWatchTypes?.map(
      (type: { name: string; slug: string }) => type.name
    ) || [];
  const tagNames =
    tags?.map((tag: { name: string; slug: string }) => tag.name) || [];

  const keywords = [
    "veilles géopolitiques",
    "actualité géopolitique",
    "Eurasie",
    "sécurité internationale",
    "analyses stratégiques",
    "intelligence géopolitique",
    "surveillance géopolitique",
    "événements internationaux",
    "tendances géopolitiques",
    "monitoring stratégique",
    ...categoryNames,
    ...tagNames.slice(0, 10), // Limiter le nombre de tags pour éviter la surcharge
  ];

  return {
    title: "Veilles Géopolitiques",
    description:
      "Suivez l'actualité géopolitique eurasiatique grâce à nos veilles stratégiques. Analyses des événements, tendances et dynamiques de sécurité internationale en temps réel.",
    keywords,
    openGraph: {
      title: "Veilles Géopolitiques | EurasiaPeace",
      description:
        "Restez informé des derniers développements géopolitiques en Eurasie avec nos veilles stratégiques et analyses en temps réel.",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/world-map-banner.webp`,
          width: 1200,
          height: 630,
          alt: "Veilles Géopolitiques EurasiaPeace - Surveillance stratégique",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Veilles Géopolitiques | EurasiaPeace",
      description:
        "Suivez l'actualité géopolitique eurasiatique avec nos analyses stratégiques en temps réel.",
      images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/world-map-banner.webp`],
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

export default async function GeopoliticalWatchesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    tag: string;
    search: string;
    page: string;
  }>;
}) {
  const { category, tag, search, page } = await searchParams;
  const categoryTerms = category ? category.split(",") : [];
  const tagTerms = tag ? tag.split(",") : [];

  const filters = {
    category: {
      taxonomy: "TYPEDEVEILLE",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagTerms || [],
    },
  };

  const [geoTypesRes, tagsRes] = await Promise.all([
    getGeopoliticalWatchesTypes(),
    getTags(),
  ]);

  const { data: geopoliticalWatchTypes } = geoTypesRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "Veilles géopolitiques",
    content:
      "La veille géopolitique est un outil essentiel pour comprendre les enjeux et les dynamiques de la sécurité internationale. Elle permet de suivre les événements, les tendances et les interactions entre les différents acteurs de la scène géopolitique.",
    src: "/world-map-banner.webp",
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
            <FiltersItems items={geopoliticalWatchTypes} query="category" />
            <span className="text-md text-text-primary font-bold">
              Étiquettes
            </span>
            <FiltersItems items={tags} query="tag" />
          </div>
        </Filters>

        <Suspense
          key={page + search + category + tag}
          fallback={<GeoWatchesSkeletons count={9} />}
        >
          <GeoWatches
            numberOfWatches={9}
            search={search}
            filters={filters}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + tag + "geo"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="veillesGeopolitique"
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
