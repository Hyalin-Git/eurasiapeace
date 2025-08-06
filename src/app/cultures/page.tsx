"use server";

import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import { getTags } from "@/features/posts/server/db/posts";
import {
  getCultures,
  getTypesDeCulture,
} from "@/features/cultures/server/db/cultures";
import Cards from "@/components/cards/Cards";
import Pagination from "@/components/pagination/Pagination";
import Banner from "@/components/Banner";

export default async function Cultures({
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
    typeDeCultures: {
      taxonomy: "TYPEDECULTURE",
      field: "SLUG",
      terms: categoryFilter || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagFilter || [],
    },
  };
  const { data: cultures, pageInfo } = await getCultures(
    9,
    filters,
    search,
    page
  );
  const { data: typesDeCulture } = await getTypesDeCulture();
  const { data: tags } = await getTags();

  const bannerProps = {
    title: "Cultures",
    content:
      "Découvrez notre riche catalogue de publications. Explorez nos notes d'analyses approfondies, nos dossiers thématiques détaillés ainsi que nos fiches et rapports de renseignement pour une compréhension stratégique des enjeux contemporains.",
    image:
      "bg-[url('/publication-banner.webp')] bg-cover bg-center bg-no-repeat",
  };

  return (
    <main>
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
        <Cards
          elements={cultures}
          className={"lg:grid-cols-3"}
          variant="publication"
        />
        <div className="mt-8">
          {pageInfo?.total > 12 && <Pagination pageInfo={pageInfo} />}
        </div>
      </div>
    </main>
  );
}
