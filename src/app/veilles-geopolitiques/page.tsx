"use server";
import { getGeopoliticalWatches } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import Cards from "@/components/cards/Cards";
import Filters from "@/components/filters/Filters";
import { getGeopoliticalWatchesTypes } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import Pagination from "@/components/pagination/Pagination";
import { getTags } from "@/features/posts/server/db/posts";
import Banner from "@/components/Banner";
import FiltersItems from "@/components/filters/FiltersItems";
import { Suspense } from "react";

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
  const categoryFilter = category ? category.split(",") : [];
  const tagFilter = tag ? tag.split(",") : [];
  const filters = {
    category: {
      taxonomy: "TYPEDEVEILLE",
      field: "SLUG",
      terms: categoryFilter || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagFilter || [],
    },
  };

  const [geoWatchesRes, geoTypesRes, tagsRes] = await Promise.all([
    getGeopoliticalWatches(9, filters, search, page),
    getGeopoliticalWatchesTypes(),
    getTags(),
  ]);

  const { data: geopoliticalWatches, pageInfo } = geoWatchesRes;
  const { data: geopoliticalWatchTypes } = geoTypesRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "Veilles géopolitiques",
    content:
      "La veille géopolitique est un outil essentiel pour comprendre les enjeux et les dynamiques de la sécurité internationale. Elle permet de suivre les événements, les tendances et les interactions entre les différents acteurs de la scène géopolitique.",
    image: "bg-[url('/world-map-banner.webp')] bg-cover bg-center bg-no-repeat",
  };

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

        <Cards elements={geopoliticalWatches} className={"lg:grid-cols-3"} />

        <div className="mt-8">
          {pageInfo?.total > 12 && <Pagination pageInfo={pageInfo} />}
        </div>
      </div>
    </div>
  );
}
