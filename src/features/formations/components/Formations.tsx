"use server";

import Cards from "@/components/cards/Cards";
import { getFormations } from "../server/db/formations";
import NoFormationsFound from "./NoFormationsFound";

export async function Formations({
  count = 2,
  filters = null,
  search = "",
  offset = 0,
}: {
  count?: number;
  filters?: {
    category: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
    niveau: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
    rythme: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
  } | null;
  search?: string;
  offset?: number;
}) {
  const { data: formations, success } = await getFormations(
    count,
    filters,
    search,
    offset
  );

  if (!success || !formations || formations.length === 0) {
    return <NoFormationsFound hasFilters={!!filters} />;
  }

  function injectClassName() {
    if (count > 4) {
      return "md:grid-cols-3";
    }

    return "md:grid-cols-2";
  }

  return (
    <Cards
      elements={formations}
      className={`${injectClassName()}`}
      variant="formation"
    />
  );
}
