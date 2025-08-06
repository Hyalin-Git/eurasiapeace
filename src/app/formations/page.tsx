"use server";
import {
  getFormations,
  getNiveauxDeFormation,
  getRythmesDeFormation,
  getTypesDeFormations,
} from "@/features/formations/server/db/formations";
import Banner from "@/components/Banner";
import Cards from "@/components/cards/Cards";
import Filters from "@/components/filters/Filters";
import Pagination from "@/components/pagination/Pagination";
import FiltersItems from "@/components/filters/FiltersItems";

export default async function Formations({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    niveau: string;
    rythme: string;
    search: string;
    page: string;
  }>;
}) {
  const { category, niveau, rythme, search, page } = await searchParams;
  const categoryFilter = category ? category.split(",") : [];
  const niveauFilter = niveau ? niveau.split(",") : [];
  const rythmeFilter = rythme ? rythme.split(",") : [];
  const filters = {
    category: {
      taxonomy: "TYPEDEFORMATION",
      field: "SLUG",
      terms: categoryFilter || [],
    },
    niveau: {
      taxonomy: "NIVEAUDEFORMATION",
      field: "SLUG",
      terms: niveauFilter || [],
    },
    rythme: {
      taxonomy: "RYTHMEDEFORMATION",
      field: "SLUG",
      terms: rythmeFilter || [],
    },
  };
  const { data: formations, pageInfo } = await getFormations(
    9,
    filters,
    search,
    page
  );
  const { data: niveauxDeFormation } = await getNiveauxDeFormation();
  const { data: typesDeFormation } = await getTypesDeFormations();
  const { data: rythmesDeFormation } = await getRythmesDeFormation();

  const bannerProps = {
    title: "Nos formations",
    content:
      "Le Centre de formation interdisciplinaire d'EurasiaPeace à dominante géopolitique  regroupe des chercheurs et professionnels  pour proposer un catalogue de formation diversifié en cours d'élaboration et qui s'oriente autour de plusieurs axes distincts, complémentaires et cohérents avec l'activité de recherche de notre think-tank.",
    image:
      "bg-[url('/banner/formation-banner.webp')] bg-cover bg-center bg-no-repeat",
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
            <FiltersItems items={typesDeFormation} query="category" />
            <span className="text-md text-text-primary font-bold">Niveaux</span>
            <FiltersItems items={niveauxDeFormation} query="niveau" />
            <span className="text-md text-text-primary font-bold">Rythmes</span>
            <FiltersItems items={rythmesDeFormation} query="rythme" />
          </div>
        </Filters>
        <Cards
          elements={formations}
          className={"lg:grid-cols-3"}
          variant="formation"
        />
        <div className="mt-8">
          {pageInfo?.total > 12 && <Pagination pageInfo={pageInfo} />}
        </div>
      </div>
    </main>
  );
}
