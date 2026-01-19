"use server";

import {
  getGeopoliticalWatch,
  getRelatedGeopoliticalWatches,
} from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import NotFound from "@/app/not-found";
import Article from "@/components/articles/Article";
import RelatedArticles from "@/components/articles/RelatedArticles";
import BreadCrumb from "@/components/BreadCrumb";
import Cards from "@/components/cards/Cards";
import CardsRow from "@/components/cards/CardsRow";
import Newsletter from "@/features/newsletter/components/Newsletter";
import { Metadata } from "next";
import { getRankMathData } from "@/server/api/rankMath";
import { parseRankMathHead } from "@/lib/cheerio";
import BannerCTA from "@/components/banners/BannerCTA";
import { redirect } from "next/navigation";
import { getRedirection } from "@/server/api/redirection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Récupérer les données Rank Math
  const { data: rankMathData, success: rankMathSuccess } =
    await getRankMathData(`veille-geopolitique/${slug}`);

  if (!rankMathSuccess || !rankMathData) {
    return {
      title: "Veille géopolitique non trouvée",
      description:
        "Cette veille géopolitique n'existe pas ou n'est plus disponible.",
    };
  }

  const meta = await parseRankMathHead(rankMathData?.head || "");

  // Image par défaut si Rank Math n'en fournit pas
  const defaultImage = `${process.env.NEXT_PUBLIC_CLIENT_URL}/placeholder-eurasiapeace.webp`;
  const ogImage = meta?.ogImage || defaultImage;
  const twitterImage = meta?.twitterImage || ogImage;

  return {
    title: meta.title || "Veille géopolitique EurasiaPeace",
    description:
      meta.description ||
      "Veille géopolitique spécialisée sur les enjeux eurasiatiques et la surveillance stratégique.",
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
      title: meta?.title || "Veille géopolitique EurasiaPeace",
      description:
        meta?.description ||
        "Veille géopolitique spécialisée sur les enjeux eurasiatiques et la surveillance stratégique.",
      type: (meta?.ogType as "website" | "article") || "article",
      url: meta?.ogUrl || `/veilles-geopolitiques/${slug}`,
      siteName: meta?.ogSiteName || "EurasiaPeace",
      publishedTime: meta?.articlePublishedTime || undefined,
      modifiedTime: meta?.articleModifiedTime || undefined,
      authors: meta?.articleAuthor ? [meta.articleAuthor] : ["EurasiaPeace"],
      section: meta?.articleSection || "Veilles Géopolitiques",
      tags: meta?.articleTag
        ? meta.articleTag.split(",").map((t: string) => t.trim())
        : undefined,
      images: [
        {
          url: ogImage,
          alt: meta.ogImageAlt || "EurasiaPeace",
          width: meta.ogImageWidth ? parseInt(meta.ogImageWidth) : 1200,
          height: meta.ogImageHeight ? parseInt(meta.ogImageHeight) : 630,
        },
      ],
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
      title: meta?.title || "Veille géopolitique EurasiaPeace",
      description:
        meta?.description ||
        "Veille géopolitique spécialisée sur les enjeux eurasiatiques et la surveillance stratégique.",
      images: [
        {
          url: twitterImage,
          alt: meta.twitterImageAlt || "EurasiaPeace",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: meta?.canonical || `/veilles-geopolitiques/${slug}`,
    },
    category: meta?.articleSection || "Veilles Géopolitiques",
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
      geopoliticalWatch?.id,
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
    <div>
      <BannerCTA
        title="Vous souhaitez publier une veille géopolitique ?"
        href="/abonnements"
      />
      <div className="flex justify-between container py-10">
        {/* Contenu principal */}
        <div className="w-full xl:w-3/5">
          <BreadCrumb isBgDark={false} />

          <Article element={geopoliticalWatch} />

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
    </div>
  );
}
