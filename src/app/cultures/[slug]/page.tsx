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
import { getRankMathData } from "@/server/api/rankMath";
import { parseRankMathHead } from "@/lib/jsDom";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Récupérer les données Rank Math
  const { data: rankMathData, success: rankMathSuccess } =
    await getRankMathData(`culture/${slug}`);

  // Récupérer les données du contenu culturel pour le titre de fallback
  const { data: culture, success: cultureSuccess } = await getCulture(slug);

  if (!rankMathSuccess || !rankMathData) {
    return {
      title: "Contenu non trouvé",
      description:
        "Ce podcast, webinaire ou interview n'existe pas ou n'est plus disponible.",
    };
  }

  const meta = await parseRankMathHead(rankMathData?.head || "");

  return {
    title:
      meta.title ||
      (cultureSuccess ? culture.title : "Contenu culturel EurasiaPeace"),
    description:
      meta.description ||
      "Podcast, webinaire ou interview d'expert géopolitique sur les enjeux eurasiatiques.",
    keywords: meta.keywords
      ? meta.keywords.split(",").map((k: string) => k.trim())
      : undefined,
    robots: meta.robots
      ? {
          index: meta.robots.includes("index"),
          follow: meta.robots.includes("follow"),
        }
      : undefined,
    authors: meta.articleAuthor
      ? [{ name: meta.articleAuthor }]
      : [{ name: "EurasiaPeace" }],
    publisher: "EurasiaPeace",
    openGraph: {
      title:
        meta?.title ||
        (cultureSuccess ? culture.title : "Contenu culturel EurasiaPeace"),
      description:
        meta?.description ||
        "Podcast, webinaire ou interview d'expert géopolitique sur les enjeux eurasiatiques.",
      type: (meta?.ogType as "website" | "article") || "article",
      url: meta?.ogUrl || `/cultures/${slug}`,
      siteName: meta?.ogSiteName || "EurasiaPeace",
      publishedTime: meta?.articlePublishedTime || undefined,
      modifiedTime: meta?.articleModifiedTime || undefined,
      authors: meta?.articleAuthor ? [meta.articleAuthor] : ["EurasiaPeace"],
      section: meta?.articleSection || "Podcasts & Webinaires",
      tags: meta?.articleTag
        ? meta.articleTag.split(",").map((t: string) => t.trim())
        : undefined,
      images: meta?.ogImage
        ? [
            {
              url: meta.ogImage,
              alt:
                meta.ogImageAlt ||
                (cultureSuccess
                  ? `${culture.title} - EurasiaPeace`
                  : "EurasiaPeace"),
              width: meta.ogImageWidth ? parseInt(meta.ogImageWidth) : 1200,
              height: meta.ogImageHeight ? parseInt(meta.ogImageHeight) : 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card:
        (meta?.twitterCard as
          | "summary"
          | "summary_large_image"
          | "app"
          | "player") || "summary_large_image",
      site: meta?.twitterSite || "@EurasiaPeace",
      creator: meta?.twitterCreator || "@EurasiaPeace",
      title:
        meta?.title ||
        (cultureSuccess ? culture.title : "Contenu culturel EurasiaPeace"),
      description:
        meta?.description ||
        "Podcast, webinaire ou interview d'expert géopolitique sur les enjeux eurasiatiques.",
      images: meta?.twitterImage
        ? [
            {
              url: meta.twitterImage,
              alt:
                meta.twitterImageAlt ||
                (cultureSuccess
                  ? `${culture.title} - EurasiaPeace`
                  : "EurasiaPeace"),
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: meta?.canonical || `/cultures/${slug}`,
    },
    category: meta?.articleSection || "Podcasts & Webinaires",
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
