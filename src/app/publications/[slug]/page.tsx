"use server";

import Newsletter from "@/features/newsletter/components/Newsletter";
import BreadCrumb from "@/components/BreadCrumb";
import { getPost, getRelatedPosts } from "@/features/posts/server/db/posts";
import NotFound from "@/app/not-found";
import Cards from "@/components/cards/Cards";
import RelatedArticles from "@/components/articles/RelatedArticles";
import Article from "@/components/articles/Article";
import CardsRow from "@/components/cards/CardsRow";
import PublishCTA from "@/components/PublishCTA";
import PostDownload from "@/features/posts/components/PostDownload";
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
    await getRankMathData(slug);

  // Récupérer les données du post pour le titre de fallback
  const { data: post, success: postSuccess } = await getPost(slug);

  if (!rankMathSuccess || !rankMathData) {
    return {
      title: "Publication non trouvée",
      description: "Cette publication n'existe pas ou n'est plus disponible.",
    };
  }

  const meta = await parseRankMathHead(rankMathData?.head || "");

  return {
    title:
      meta.title || (postSuccess ? post.title : "Publication EurasiaPeace"),
    description:
      meta.description ||
      "Publication géopolitique spécialisée sur les enjeux eurasiatiques.",
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
        meta?.title || (postSuccess ? post.title : "Publication EurasiaPeace"),
      description:
        meta?.description ||
        "Publication géopolitique spécialisée sur les enjeux eurasiatiques.",
      type: (meta?.ogType as "website" | "article") || "article",
      url: meta?.ogUrl || `/publications/${slug}`,
      siteName: meta?.ogSiteName || "EurasiaPeace",
      publishedTime: meta?.articlePublishedTime || undefined,
      modifiedTime: meta?.articleModifiedTime || undefined,
      authors: meta?.articleAuthor ? [meta.articleAuthor] : ["EurasiaPeace"],
      section: meta?.articleSection || "Publications",
      tags: meta?.articleTag
        ? meta.articleTag.split(",").map((t: string) => t.trim())
        : undefined,
      images: meta?.ogImage
        ? [
            {
              url: meta.ogImage,
              alt:
                meta.ogImageAlt ||
                (postSuccess ? `${post.title} - EurasiaPeace` : "EurasiaPeace"),
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
        meta?.title || (postSuccess ? post.title : "Publication EurasiaPeace"),
      description:
        meta?.description ||
        "Publication géopolitique spécialisée sur les enjeux eurasiatiques.",
      images: meta?.twitterImage
        ? [
            {
              url: meta.twitterImage,
              alt:
                meta.twitterImageAlt ||
                (postSuccess ? `${post.title} - EurasiaPeace` : "EurasiaPeace"),
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: meta?.canonical || `/publications/${slug}`,
    },
    category: meta?.articleSection || "Publications",
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, success } = await getPost(slug);
  const { data: relatedPosts } = await getRelatedPosts(
    post?.categories?.nodes[0]?.slug,
    post?.id
  );

  if (!success) {
    return <NotFound />;
  }

  const fileUrl = post?.acfFields?.pdf?.node?.filePath;
  const isPublic = post?.contenuPublic?.isPublic ?? "Publique";

  return (
    <div className="relative container flex justify-between py-10">
      {/* Contenu principal */}
      <div className="w-full xl:w-3/5">
        {/* Fil d'Ariane */}
        <BreadCrumb isBgDark={false} />

        <Article element={post} />

        {/* Articles de la même catégorie (version mobile) */}
        <RelatedArticles className="xl:hidden mt-12">
          <Cards elements={relatedPosts} className="sm:grid-cols-1" />
        </RelatedArticles>

        {/* Newsletter */}
        <Newsletter />
      </div>
      {/* Floating Sidebar - Articles liés */}
      <aside className="max-w-sm hidden xl:block">
        <div className="flex flex-col gap-4 sticky top-30">
          <RelatedArticles className="bg-white rounded-lg p-4 mb-4 h-fit">
            <CardsRow elements={relatedPosts} />
          </RelatedArticles>

          <PostDownload fileUrl={fileUrl} isPublic={isPublic} />
        </div>
      </aside>

      <PublishCTA />
    </div>
  );
}
