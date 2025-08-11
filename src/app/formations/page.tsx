"use server";

import {
  getNiveauxDeFormation,
  getRythmesDeFormation,
  getTypesDeFormations,
} from "@/features/formations/server/db/formations";
import Banner from "@/components/Banner";
import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import { Formations } from "@/features/formations/components/Formations";
import { Suspense } from "react";
import { FormationsSkeletons } from "@/features/formations/components/FormationSkeletons";
import Paginations from "@/components/pagination/Paginations";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";

export default async function FormationsPage({
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

  const categoryTerms = category ? category.split(",") : [];
  const niveauTerms = niveau ? niveau.split(",") : [];
  const rythmeTerms = rythme ? rythme.split(",") : [];

  const filters = {
    category: {
      taxonomy: "TYPEDEFORMATION",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    niveau: {
      taxonomy: "NIVEAUDEFORMATION",
      field: "SLUG",
      terms: niveauTerms || [],
    },
    rythme: {
      taxonomy: "RYTHMEDEFORMATION",
      field: "SLUG",
      terms: rythmeTerms || [],
    },
  };

  const [niveauxDeFormationRes, typesDeFormationRes, rythmesDeFormationRes] =
    await Promise.all([
      getNiveauxDeFormation(),
      getTypesDeFormations(),
      getRythmesDeFormation(),
    ]);

  const { data: niveauxDeFormation } = niveauxDeFormationRes;
  const { data: typesDeFormation } = typesDeFormationRes;
  const { data: rythmesDeFormation } = rythmesDeFormationRes;

  const bannerProps = {
    title: "Nos formations",
    content:
      "Le Centre de formation interdisciplinaire d'EurasiaPeace à dominante géopolitique  regroupe des chercheurs et professionnels  pour proposer un catalogue de formation diversifié en cours d'élaboration et qui s'oriente autour de plusieurs axes distincts, complémentaires et cohérents avec l'activité de recherche de notre think-tank.",
    image:
      "bg-[url('/banner/formation-banner.webp')] bg-cover bg-center bg-no-repeat",
  };

  const offset = page ? (parseInt(page) - 1) * 9 : 0;

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

        <Suspense fallback={<FormationsSkeletons count={9} />}>
          <Formations
            count={9}
            search={search}
            filters={filters}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + niveau + rythme + "formations"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="formations"
            limit={9}
            filters={filters}
            search={search}
            offset={offset}
          />
        </Suspense>
      </div>
    </main>
  );
}
