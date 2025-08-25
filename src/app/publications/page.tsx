import { getCategories, getTags } from "@/features/posts/server/db/posts";
import Banner from "@/components/Banner";
import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import Posts from "@/features/posts/components/Posts";
import React, { Suspense } from "react";
import { PostsSkeletons } from "@/features/posts/components/PostsSkeletons";
import Paginations from "@/components/pagination/Paginations";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications - EurasiaPeace",
  description:
    "Découvrez notre riche catalogue de publications sur les enjeux géopolitiques eurasiatiques. Explorez nos analyses approfondies, dossiers thématiques et rapports de renseignement stratégique.",
  keywords: [
    "publications",
    "analyses géopolitiques",
    "Eurasie",
    "rapports stratégiques",
    "dossiers thématiques",
    "renseignement",
    "géopolitique",
    "paix",
    "sécurité internationale",
  ],
  openGraph: {
    title: "Publications - EurasiaPeace",
    description:
      "Accédez à notre collection d'analyses géopolitiques, de dossiers thématiques et de rapports stratégiques sur l'Eurasie.",
    type: "website",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "Publications EurasiaPeace - Analyses géopolitiques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications - EurasiaPeace",
    description:
      "Découvrez nos analyses approfondies sur les enjeux géopolitiques eurasiatiques.",
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

export default async function Publications({
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
  const categoryFilter = category ? category.split(",") : [];
  const tagFilter = tag ? tag.split(",") : [];

  const filters = {
    category: {
      taxonomy: "CATEGORY",
      field: "SLUG",
      terms: categoryFilter || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagFilter || [],
    },
  };

  // We want the filters to be fetched before rendering the posts
  const [categoriesRes, tagsRes] = await Promise.all([
    getCategories(),
    getTags(),
  ]);

  const { data: categories } = categoriesRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "Publications",
    content:
      "Découvrez notre riche catalogue de publications. Explorez nos notes d'analyses approfondies, nos dossiers thématiques détaillés ainsi que nos fiches et rapports de renseignement pour une compréhension stratégique des enjeux contemporains.",
    src: "/publication-banner.webp",
  };

  const offset = page ? (parseInt(page) - 1) * 9 : 0;

  return (
    <div>
      <Banner BannerProps={bannerProps} />
      <div className="relative container py-10">
        <Filters filters={filters}>
          <div className="flex flex-col gap-4">
            <span className="text-md text-text-primary font-bold">
              Catégories
            </span>
            <FiltersItems items={categories} query="category" />
            <span className="text-md text-text-primary font-bold">
              Étiquettes
            </span>
            <FiltersItems items={tags} query="tag" />
          </div>
        </Filters>

        <Suspense
          key={page + search + category + tag}
          fallback={<PostsSkeletons count={9} />}
        >
          <Posts
            numberOfPosts={9}
            search={search}
            filters={filters}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + tag + "posts"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="posts"
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
