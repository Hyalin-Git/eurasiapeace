"use server";

import Cards from "@/components/cards/Cards";
import { getCultures } from "../server/db/cultures";
import NoCulturesFound from "./NoCulturesFound";

export default async function Cultures({
  count = 3,
  filters = null,
  search = "",
  offset = 0,
}: {
  count?: number;
  filters?: {
    typeDeCultures: {
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
  const { data: cultures, success } = await getCultures(
    count,
    filters,
    search,
    offset
  );

  if (!success || !cultures || cultures.length === 0) {
    return <NoCulturesFound hasFilters={!!filters} />;
  }

  return <Cards elements={cultures} className="lg:grid-cols-3" />;
}
