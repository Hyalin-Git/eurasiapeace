"use server";

import NotFound from "@/app/not-found";
import { getRankMathData } from "@/server/api/rankMath";
import { getPageContent } from "@/server/db/page";
import { Metadata } from "next";
import { parseRankMathHead } from "@/lib/cheerio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data, success } = await getRankMathData(slug);

  if (!success || !data) {
    return {
      title: "Page non trouvée",
      description: "La page que vous recherchez n'existe pas.",
    };
  }

  const {
    title,
    description,
    keywords,
    ogImage,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    ogType,
    ogUrl,
    ogSiteName,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterImage,
    twitterImageAlt,
    canonical,
    articleAuthor,
    articlePublishedTime,
    articleModifiedTime,
    articleSection,
    articleTag,
  } = await parseRankMathHead(data?.head || "");

  return {
    title,
    description,
    keywords: keywords
      ? keywords.split(",").map((k: string) => k.trim())
      : undefined,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      type: (ogType as "website" | "article") || "website",
      url: ogUrl || undefined,
      siteName: ogSiteName || "Eurasia Peace",
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: ogImageAlt || title || "",
              width: ogImageWidth ? parseInt(ogImageWidth) : undefined,
              height: ogImageHeight ? parseInt(ogImageHeight) : undefined,
            },
          ]
        : undefined,
      // Pour les articles
      ...(ogType === "article" && {
        publishedTime: articlePublishedTime || undefined,
        modifiedTime: articleModifiedTime || undefined,
        authors: articleAuthor ? [articleAuthor] : undefined,
        section: articleSection || undefined,
        tags: articleTag
          ? articleTag.split(",").map((t: string) => t.trim())
          : undefined,
      }),
    },
    twitter: {
      card:
        (twitterCard as "summary" | "summary_large_image" | "app" | "player") ||
        "summary_large_image",
      site: twitterSite || undefined,
      creator: twitterCreator || undefined,
      title: title || undefined,
      description: description || undefined,
      images: twitterImage
        ? [
            {
              url: twitterImage,
              alt: twitterImageAlt || title || "",
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: canonical || undefined,
    },
    // Métadonnées additionnelles pour le SEO
    category: articleSection || undefined,
  };
}

// The function `WordpressPage` fetches and displays content from a WordPress page based on the
// provided slug parameter if the page does not exist, it returns a NotFound component.
export default async function WordpressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, success } = await getPageContent(`/${slug}`);

  if (!success) {
    return <NotFound />;
  }

  return (
    <div className="container py-10">
      <div className="prose-lg prose-slate max-w-4xl mx-auto">
        <h1 className="font-bold mb-8 text-gray-900 text-center">
          {data?.title}
        </h1>

        <div
          className="prose-lg prose-slate prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </div>
  );
}
