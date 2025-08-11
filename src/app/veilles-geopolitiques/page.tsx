"use server";

import Filters from "@/components/filters/Filters";
import { getGeopoliticalWatchesTypes } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import { getTags } from "@/features/posts/server/db/posts";
import Banner from "@/components/Banner";
import FiltersItems from "@/components/filters/FiltersItems";
import { Suspense } from "react";
import GeoWatches from "@/features/geopoliticalWatches/components/GeoWatches";
import { GeoWatchesSkeletons } from "@/features/geopoliticalWatches/components/GeoWatchesSkeletons";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import Paginations from "@/components/pagination/Paginations";

export default async function GeopoliticalWatchesPage({
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
    category: {
      taxonomy: "TYPEDEVEILLE",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagTerms || [],
    },
  };

  const [geoTypesRes, tagsRes] = await Promise.all([
    getGeopoliticalWatchesTypes(),
    getTags(),
  ]);

  const { data: geopoliticalWatchTypes } = geoTypesRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "Veilles géopolitiques",
    content:
      "La veille géopolitique est un outil essentiel pour comprendre les enjeux et les dynamiques de la sécurité internationale. Elle permet de suivre les événements, les tendances et les interactions entre les différents acteurs de la scène géopolitique.",
    image: "bg-[url('/world-map-banner.webp')] bg-cover bg-center bg-no-repeat",
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
            <FiltersItems items={geopoliticalWatchTypes} query="category" />
            <span className="text-md text-text-primary font-bold">
              Étiquettes
            </span>
            <FiltersItems items={tags} query="tag" />
          </div>
        </Filters>

        <Suspense
          key={page + search + category + tag}
          fallback={<GeoWatchesSkeletons count={9} />}
        >
          <GeoWatches
            numberOfWatches={9}
            search={search}
            filters={filters}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + tag + "geo"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="veillesGeopolitique"
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
