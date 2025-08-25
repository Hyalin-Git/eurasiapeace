"use server";

import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import { getTags } from "@/features/posts/server/db/posts";
import { getTypesDeCulture } from "@/features/cultures/server/db/cultures";
import Banner from "@/components/Banner";
import Cultures from "@/features/cultures/components/Cultures";
import { Suspense } from "react";
import { CulturesSkeletons } from "@/features/cultures/components/CultureSkeletons";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import Paginations from "@/components/pagination/Paginations";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Récupérer les types de contenus et tags pour les mots-clés
  const { data: typesDeCulture } = await getTypesDeCulture();
  const { data: tags } = await getTags();

  // Extraire les noms des types de contenus et tags
  const contentTypeNames =
    typesDeCulture?.map((type: { name: string; slug: string }) => type.name) ||
    [];
  const tagNames =
    tags?.map((tag: { name: string; slug: string }) => tag.name) || [];

  const keywords = [
    "podcasts",
    "webinaires",
    "la voix des pros",
    "experts géopolitiques",
    "contenus audio",
    "analyses d'experts",
    "Eurasie",
    "géopolitique",
    "conférences",
    "interviews d'experts",
    "éducation géopolitique",
    ...contentTypeNames,
    ...tagNames.slice(0, 10), // Limiter le nombre de tags
  ];

  return {
    title: "Cultures",
    description:
      "Découvrez nos podcasts, webinaires et interviews d'experts géopolitiques. Écoutez la voix des professionnels et participez à nos formations en ligne sur les enjeux eurasiatiques.",
    keywords,
    openGraph: {
      title: "Cultures | EurasiaPeace",
      description:
        "Accédez à nos contenus audio exclusifs : podcasts géopolitiques, webinaires éducatifs et interviews d'experts sur l'Eurasie.",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
          width: 1200,
          height: 630,
          alt: "Podcasts, Webinaires & La Voix des Pros - EurasiaPeace",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cultures | EurasiaPeace",
      description:
        "Découvrez nos podcasts géopolitiques, webinaires et interviews d'experts sur l'Eurasie.",
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

export default async function CulturesPage({
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
    typeDeCultures: {
      taxonomy: "TYPEDECULTURE",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagTerms || [],
    },
  };

  const [typesDeCultureRes, tagsRes] = await Promise.all([
    getTypesDeCulture(),
    getTags(),
  ]);

  const { data: typesDeCulture } = typesDeCultureRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "Cultures",
    content:
      "Découvrez notre riche catalogue de publications. Explorez nos notes d'analyses approfondies, nos dossiers thématiques détaillés ainsi que nos fiches et rapports de renseignement pour une compréhension stratégique des enjeux contemporains.",
    src: "/publication-banner.webp",
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
            <FiltersItems items={typesDeCulture} query="category" />
            <span className="text-md text-text-primary font-bold">
              Étiquettes
            </span>
            <FiltersItems items={tags} query="tag" />
          </div>
        </Filters>

        <Suspense
          key={page + search + category + tag}
          fallback={<CulturesSkeletons count={9} />}
        >
          <Cultures
            count={9}
            filters={filters}
            search={search}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + tag + "cultures"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="cultures"
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
