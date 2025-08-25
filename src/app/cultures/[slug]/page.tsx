"use server";

import Article from "@/components/articles/Article";
import BreadCrumb from "@/components/BreadCrumb";
import NotFound from "@/app/not-found";
import ReaderOpinion from "@/components/articles/ReaderOpinion";
import RelatedArticles from "@/components/articles/RelatedArticles";
import Newsletter from "@/features/newsletter/components/Newsletter";
import CardsRow from "@/components/cards/CardsRow";
import Cards from "@/components/cards/Cards";
import { getCulture } from "@/features/cultures/server/db/cultures";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: culture, success } = await getCulture(slug);

  if (!success || !culture) {
    return {
      title: "Contenu non trouvé - EurasiaPeace",
      description:
        "Ce podcast, webinaire ou interview n'existe pas ou n'est plus disponible.",
    };
  }

  const title = `${culture.title} - EurasiaPeace`;
  const description =
    culture.excerpt ||
    `Découvrez ${culture.title}. Podcast, webinaire ou interview d'expert géopolitique sur les enjeux eurasiatiques.`;
  const imageUrl =
    culture.featuredImage?.node?.sourceUrl || "/publication-banner.webp";
  const publishedDate = culture?.date;

  // Extraire les types de contenus et tags pour les mots-clés
  const contentTypes =
    culture.typesDeCulture?.nodes?.map(
      (type: { name: string; slug: string }) => type.name
    ) || [];
  const tags =
    culture.tags?.nodes?.map(
      (tag: { name: string; slug: string }) => tag.name
    ) || [];

  // Déterminer le type de contenu pour des mots-clés spécifiques
  const isAudioContent = contentTypes.some(
    (type: string) =>
      type.toLowerCase().includes("podcast") ||
      type.toLowerCase().includes("audio")
  );
  const isWebinar = contentTypes.some(
    (type: string) =>
      type.toLowerCase().includes("webinaire") ||
      type.toLowerCase().includes("formation")
  );

  const keywords = [
    ...contentTypes,
    ...tags,
    ...(isAudioContent ? ["podcast", "audio", "écoute"] : []),
    ...(isWebinar ? ["webinaire", "formation en ligne", "éducation"] : []),
    "expert géopolitique",
    "la voix des pros",
    "Eurasie",
    "analyse géopolitique",
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
      section: contentTypes[0] || "Podcasts & Webinaires",
      tags: tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${culture.title} - EurasiaPeace`,
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
      canonical: `/cultures/${slug}`,
    },
  };
}

export default async function CulturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: culture, success } = await getCulture(slug);
  //   const { data: relatedCultures } = await getRelatedCultures();

  if (!success) {
    return <NotFound />;
  }

  return (
    <div className="py-10">
      <div className="flex justify-between container">
        {/* Contenu principal */}
        <div className="w-3/5">
          {/* Fil d'Ariane */}
          <BreadCrumb isBgDark={false} />

          <Article element={culture} />

          <ReaderOpinion />

          {/* Articles de la même catégorie (version mobile) */}
          <RelatedArticles className="xl:hidden mt-12">
            <div></div>
            {/* <Cards elements={relatedCultures} className="sm:grid-cols-1" /> */}
          </RelatedArticles>

          {/* Newsletter */}
          <Newsletter />
        </div>

        {/* Floating Sidebar - Articles liés */}
        <aside className="max-w-sm hidden xl:block">
          <div className="flex flex-col gap-4 sticky top-30">
            <RelatedArticles className="bg-white rounded-lg p-4 mb-4 h-fit">
              <div></div>
              {/* <CardsRow elements={relatedCultures} /> */}
            </RelatedArticles>
          </div>
        </aside>
      </div>
    </div>
  );
}
