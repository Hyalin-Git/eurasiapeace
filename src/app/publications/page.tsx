"use server";

import {
  getCategories,
  getPostsPagination,
  getTags,
} from "@/features/posts/server/db/posts";
import Banner from "@/components/Banner";
import Filters from "@/components/filters/Filters";
import Pagination from "@/components/pagination/Pagination";
import FiltersItems from "@/components/filters/FiltersItems";
import Posts from "@/features/posts/components/Posts";
import React, { Suspense } from "react";
import { PostsSkeletons } from "@/features/posts/components/PostsSkeletons";

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
  const [categoriesRes, tagsRes, pageInfoRes] = await Promise.all([
    getCategories(),
    getTags(),
    getPostsPagination(),
  ]);

  const { data: categories } = categoriesRes;
  const { data: tags } = tagsRes;
  const { data: pageInfo } = pageInfoRes;

  const bannerProps = {
    title: "Publications",
    content:
      "Découvrez notre riche catalogue de publications. Explorez nos notes d'analyses approfondies, nos dossiers thématiques détaillés ainsi que nos fiches et rapports de renseignement pour une compréhension stratégique des enjeux contemporains.",
    image:
      "bg-[url('/publication-banner.webp')] bg-cover bg-center bg-no-repeat",
  };

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
            offset={page ? (parseInt(page) - 1) * 9 : 0}
          />
        </Suspense>

        {pageInfo && (
          <div className="mt-8">
            {pageInfo?.total > 12 && <Pagination pageInfo={pageInfo} />}
          </div>
        )}
      </div>
    </div>
  );
}
