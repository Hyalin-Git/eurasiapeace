"use server";

import Cards from "@/components/cards/Cards";
import { getGeopoliticalWatches } from "../server/db/geopoliticalWatches";
import NoGeoWatchesFound from "./NoGeoWatchesFound";

export default async function GeoWatches({
  numberOfWatches = 3,
  filters = null,
  search = "",
  offset = 0,
}: {
  numberOfWatches?: number;
  filters?: {
    category: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
    tag: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
  } | null;
  search?: string;
  offset?: number;
}) {
  const { data: geoWatches, success } = await getGeopoliticalWatches(
    numberOfWatches,
    filters,
    search,
    offset
  );

  if (!success || !geoWatches || geoWatches.length === 0) {
    return <NoGeoWatchesFound hasFilters={!!filters} />;
  }

  function injectClassName() {
    if (numberOfWatches > 4) {
      return "md:grid-cols-3";
    }

    return "md:grid-cols-4";
  }

  return <Cards elements={geoWatches} className={`${injectClassName()}`} />;
}
