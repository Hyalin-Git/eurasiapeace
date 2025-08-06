"use server";

import {
  getCategories,
  getPosts,
  getTags,
} from "@/features/posts/server/db/posts";
import Banner from "@/components/Banner";
import Cards from "@/components/cards/Cards";
import Filters from "@/components/filters/Filters";
import Pagination from "@/components/pagination/Pagination";
import FiltersItems from "@/components/filters/FiltersItems";

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
  const { data: posts, pageInfo } = await getPosts(12, filters, search, page);
  const { data: categories } = await getCategories();
  const { data: tags } = await getTags();

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
      <div className="container py-10">
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
        <Cards elements={posts} className={"lg:grid-cols-3"} />
        <div className="mt-8">
          {pageInfo?.total > 12 && <Pagination pageInfo={pageInfo} />}
        </div>
      </div>
    </div>
  );
}
