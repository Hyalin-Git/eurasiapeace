"use server";

import Article from "@/components/articles/Article";
import BreadCrumb from "@/components/BreadCrumb";
import NotFound from "@/app/not-found";
import RelatedArticles from "@/components/articles/RelatedArticles";
import Newsletter from "@/features/newsletter/components/Newsletter";
import CardsRow from "@/components/cards/CardsRow";
import Cards from "@/components/cards/Cards";
import {
  getExpertVoice,
  getRelatedExpertsVoices,
} from "@/features/expertsVoices/server/db/expertsVoices";
import { Metadata } from "next";
import { getRankMathData } from "@/server/api/rankMath";
import { parseRankMathHead } from "@/lib/jsDom";
import { getRedirection } from "@/server/api/redirection";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Récupérer les données Rank Math
  const { data: rankMathData, success: rankMathSuccess } =
    await getRankMathData(`la-voix-dun-expert/${slug}`);

  if (!rankMathSuccess || !rankMathData) {
    return {
      title: "Contenu non trouvé",
      description:
        "Ce podcast, webinaire ou interview n'existe pas ou n'est plus disponible.",
    };
  }

  const meta = await parseRankMathHead(rankMathData?.head || "");

  return {
    title: meta.title || "Contenu culturel EurasiaPeace",
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
      title: meta?.title || "Contenu culturel EurasiaPeace",
      description:
        meta?.description ||
        "Podcast, webinaire ou interview d'expert géopolitique sur les enjeux eurasiatiques.",
      type: (meta?.ogType as "website" | "article") || "article",
      url: meta?.ogUrl || `/la-voix-des-experts/${slug}`,
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
              alt: meta.ogImageAlt || "EurasiaPeace",
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
      title: meta?.title || "Contenu culturel EurasiaPeace",
      description:
        meta?.description ||
        "Podcast, webinaire ou interview d'expert géopolitique sur les enjeux eurasiatiques.",
      images: meta?.twitterImage
        ? [
            {
              url: meta.twitterImage,
              alt: meta.twitterImageAlt || "EurasiaPeace",
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: meta?.canonical || `/la-voix-des-experts/${slug}`,
    },
    category: meta?.articleSection || "Podcasts & Webinaires",
  };
}

export default async function ExpertVoicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: expertVoice, success } = await getExpertVoice(slug);
  const { data: relatedExpertsVoices } = await getRelatedExpertsVoices(
    expertVoice?.typesExperts?.nodes[0]?.slug,
    expertVoice?.id
  );

  if (!success) {
    const { data: redirection, success: redirectionSuccess } =
      await getRedirection(slug);

    if (redirectionSuccess) {
      return redirect(redirection?.redirect_url || "");
    }

    return <NotFound />;
  }

  return (
    <div className="flex justify-between container py-10">
      {/* Contenu principal */}
      <div className="w-full xl:w-3/5">
        {/* Fil d'Ariane */}
        <BreadCrumb isBgDark={false} />

        <Article element={expertVoice} />

        {/* Articles de la même catégorie (version mobile) */}
        <RelatedArticles className="xl:hidden mt-12">
          <Cards elements={relatedExpertsVoices} className="sm:grid-cols-1" />
        </RelatedArticles>

        {/* Newsletter */}
        <Newsletter />
      </div>

      {/* Floating Sidebar - Articles liés */}
      <aside className="max-w-sm hidden xl:block">
        <div className="flex flex-col gap-4 sticky top-30">
          <RelatedArticles className="bg-white rounded-lg p-4 mb-4 h-fit">
            <CardsRow elements={relatedExpertsVoices} />
          </RelatedArticles>
        </div>
      </aside>
    </div>
  );
}
