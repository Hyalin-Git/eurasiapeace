"use server";

import Banner from "@/components/Banner";
import { getFormation } from "@/features/formations/server/db/formations";
import NotFound from "@/app/not-found";
import { Medal } from "lucide-react";
import Tag from "@/components/tags/Tag";
import FormationNav from "@/features/formations/components/FormationNav";
import Overview from "@/features/formations/components/Overview";
import Objectives from "@/features/formations/components/Objectives";
import Programme from "@/features/formations/components/Programme";
import Modalities from "@/features/formations/components/Modalities";
import FormationReviews from "@/features/formations/components/FormationReviews";
import { isEmpty } from "@/utils/isEmpty";
import Evaluations from "@/features/formations/components/Evaluations";
import FormationRecap from "@/features/formations/components/FormationRecap";
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
    await getRankMathData(`formation/${slug}`);

  if (!rankMathSuccess || !rankMathData) {
    return {
      title: "Formation non trouvée",
      description: "Cette formation n'existe pas ou n'est plus disponible.",
    };
  }

  const meta = await parseRankMathHead(rankMathData?.head || "");

  return {
    title: meta.title || "Formation EurasiaPeace",
    description:
      meta.description ||
      "Formation géopolitique interdisciplinaire dispensée par des experts EurasiaPeace.",
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
      title: meta?.title || "Formation EurasiaPeace",
      description:
        meta?.description ||
        "Formation géopolitique interdisciplinaire dispensée par des experts EurasiaPeace.",
      type: (meta?.ogType as "website" | "article") || "article",
      url: meta?.ogUrl || `/formations/${slug}`,
      siteName: meta?.ogSiteName || "EurasiaPeace",
      publishedTime: meta?.articlePublishedTime || undefined,
      modifiedTime: meta?.articleModifiedTime || undefined,
      authors: meta?.articleAuthor ? [meta.articleAuthor] : ["EurasiaPeace"],
      section: meta?.articleSection || "Formations",
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
      title: meta?.title || "Formation EurasiaPeace",
      description:
        meta?.description ||
        "Formation géopolitique interdisciplinaire dispensée par des experts EurasiaPeace.",
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
      canonical: meta?.canonical || `/formations/${slug}`,
    },
    category: meta?.articleSection || "Formations",
  };
}

export default async function FormationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: formation, success } = await getFormation(slug);

  if (!success) {
    return <NotFound />;
  }

  const niveauformation = formation?.niveauxDeFormation?.nodes[0]?.name;

  const tagContent = niveauformation ? niveauformation : "Aucun niveau requis";

  const bannerProps = {
    title: formation.title,
    content: "",
    src: formation?.singleFormations?.banner?.node?.sourceUrl || "",
  };

  const evaluations =
    formation?.singleFormations?.evaluations?.evaluationsBoxes || [];
  const baremePdf =
    formation?.singleFormations?.evaluations?.baremePdf?.node?.filePath;

  return (
    <div>
      <Banner BannerProps={bannerProps}>
        <Tag
          icon={<Medal size={16} />}
          content={tagContent}
          className="text-sm! text-text-third"
        />
      </Banner>
      <div className="container flex flex-col lg:flex-row gap-15 py-10">
        {/* Main content */}
        <div className="w-full lg:w-2/3">
          {/* Nav */}
          <FormationNav />
          {/* Aperçu de la formation */}
          <Overview formation={formation} />

          {/* Objectifs pédagogiques */}
          <Objectives formation={formation} />

          {/* Programme de la formation */}
          <Programme formation={formation} />

          {/* Évaluation */}
          <Evaluations evaluations={evaluations} baremePdf={baremePdf} />

          {/* Modalités */}
          <Modalities formation={formation} />
        </div>

        {/* Aside */}
        <aside className="w-full lg:w-1/3 ">
          <div className="flex flex-col gap-8 sticky top-30">
            <FormationRecap formation={formation} />

            {!isEmpty(formation?.singleFormations?.testimonials || []) && (
              <FormationReviews
                reviews={formation?.singleFormations?.testimonials}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
