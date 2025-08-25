"use server";

import {
  getGeopoliticalWatch,
  getRelatedGeopoliticalWatches,
} from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import NotFound from "@/app/not-found";
import Article from "@/components/articles/Article";
import ReaderOpinion from "@/components/articles/ReaderOpinion";
import RelatedArticles from "@/components/articles/RelatedArticles";
import BreadCrumb from "@/components/BreadCrumb";
import Cards from "@/components/cards/Cards";
import CardsRow from "@/components/cards/CardsRow";
import Newsletter from "@/features/newsletter/components/Newsletter";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: geopoliticalWatch, success } = await getGeopoliticalWatch(slug);

  if (!success || !geopoliticalWatch) {
    return {
      title: "Veille géopolitique non trouvée",
      description:
        "Cette veille géopolitique n'existe pas ou n'est plus disponible.",
    };
  }

  const title = `${geopoliticalWatch.title}`;
  const description =
    geopoliticalWatch.excerpt ||
    `Découvrez notre veille géopolitique sur ${geopoliticalWatch.title}. Analyse stratégique et surveillance des événements géopolitiques eurasiatiques.`;
  const imageUrl =
    geopoliticalWatch.featuredImage?.node?.sourceUrl ||
    "/world-map-banner.webp";
  const publishedDate = geopoliticalWatch.date;

  // Extraire les types de veilles et tags pour les mots-clés
  const watchTypes =
    geopoliticalWatch.typeDeVeilles?.nodes?.map(
      (type: { name: string; slug: string }) => type.name
    ) || [];
  const tags =
    geopoliticalWatch.tags?.nodes?.map(
      (tag: { name: string; slug: string }) => tag.name
    ) || [];

  const keywords = [
    ...watchTypes,
    ...tags,
    "veille géopolitique",
    "actualité géopolitique",
    "Eurasie",
    "surveillance stratégique",
    "intelligence géopolitique",
    "EurasiaPeace",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "EurasiaPeace" }],
    publisher: "EurasiaPeace",
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedDate,
      authors: ["EurasiaPeace"],
      section: watchTypes[0] || "Veilles Géopolitiques",
      tags: tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${geopoliticalWatch.title} - Veille géopolitique EurasiaPeace`,
        },
      ],
      siteName: "EurasiaPeace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@EurasiaPeace",
      site: "@EurasiaPeace",
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
    alternates: {
      canonical: `/veilles-geopolitiques/${slug}`,
    },
  };
}

export default async function GeopoliticalWatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Get geopolitical watch by slug
  const { data: geopoliticalWatch, success } = await getGeopoliticalWatch(slug);

  // Get related geopolitical watches
  const { data: relatedGeopoliticalWatches } =
    await getRelatedGeopoliticalWatches(
      geopoliticalWatch?.typeDeVeilles?.nodes[0]?.slug,
      geopoliticalWatch?.id
    );

  if (!success) {
    return <NotFound />;
  }

  return (
    <div className="flex justify-between container py-10">
      {/* Contenu principal */}
      <div className="w-3/5">
        <BreadCrumb isBgDark={false} />

        <Article element={geopoliticalWatch} />

        <ReaderOpinion />

        {/* Articles de la même catégorie (version mobile) */}
        <RelatedArticles className="xl:hidden mt-12">
          <Cards
            elements={relatedGeopoliticalWatches}
            className="sm:grid-cols-1"
          />
        </RelatedArticles>

        {/* Newsletter */}
        <Newsletter />
      </div>

      {/* Floating Sidebar - Articles liés */}
      <aside className="max-w-sm hidden xl:block">
        <div className="flex flex-col gap-4 sticky top-30">
          <RelatedArticles className="bg-white rounded-lg p-4 mb-4 h-fit">
            <CardsRow elements={relatedGeopoliticalWatches} />
          </RelatedArticles>
        </div>
      </aside>
    </div>
  );
}
