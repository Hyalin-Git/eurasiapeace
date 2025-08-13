"use server";

import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import { getTags } from "@/features/posts/server/db/posts";
import { getTypesDeCulture } from "@/features/cultures/server/db/cultures";
import Banner from "@/components/Banner";
import Cultures from "@/features/cultures/components/Cultures";
import { Suspense } from "react";
import { CulturesSkeletons } from "@/features/cultures/components/CultureSkeletons";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import Paginations from "@/components/pagination/Paginations";

export default async function CulturesPage({
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
  const categoryTerms = category ? category.split(",") : [];
  const tagTerms = tag ? tag.split(",") : [];

  const filters = {
    typeDeCultures: {
      taxonomy: "TYPEDECULTURE",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagTerms || [],
    },
  };

  const [typesDeCultureRes, tagsRes] = await Promise.all([
    getTypesDeCulture(),
    getTags(),
  ]);

  const { data: typesDeCulture } = typesDeCultureRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "Cultures",
    content:
      "Découvrez notre riche catalogue de publications. Explorez nos notes d'analyses approfondies, nos dossiers thématiques détaillés ainsi que nos fiches et rapports de renseignement pour une compréhension stratégique des enjeux contemporains.",
    image:
      "bg-[url('/publication-banner.webp')] bg-cover bg-center bg-no-repeat",
  };

  const offset = page ? (parseInt(page) - 1) * 9 : 0;

  return (
    <div>
      <Banner BannerProps={bannerProps} />
      <div className="container py-10">
        <Filters filters={filters}>
          <div className="flex flex-col gap-4">
            <span className="text-md text-text-primary font-bold">
              Catégories
            </span>
            <FiltersItems items={typesDeCulture} query="category" />
            <span className="text-md text-text-primary font-bold">
              Étiquettes
            </span>
            <FiltersItems items={tags} query="tag" />
          </div>
        </Filters>

        <Suspense
          key={page + search + category + tag}
          fallback={<CulturesSkeletons count={9} />}
        >
          <Cultures
            count={9}
            filters={filters}
            search={search}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + tag + "cultures"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="cultures"
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
