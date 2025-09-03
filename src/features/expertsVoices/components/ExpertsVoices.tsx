"use server";

import Cards from "@/components/cards/Cards";
import { getExpertsVoices } from "../server/db/expertsVoices";
import NoExpertsVoicesFound from "./NoExpertsVoicesFound";

export default async function ExpertsVoices({
  count = 3,
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
    tag: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
  } | null;
  search?: string;
  offset?: number;
}) {
  const { data: expertsVoices, success } = await getExpertsVoices(
    count,
    filters,
    search,
    offset
  );

  if (!success || !expertsVoices || expertsVoices.length === 0) {
    return <NoExpertsVoicesFound hasFilters={!!filters} />;
  }

  return <Cards elements={expertsVoices} className="lg:grid-cols-3" />;
}
