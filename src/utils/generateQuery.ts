import { Filters } from "@/types";

export function generateQuery(
  filters: Filters | null = null,
  searchTerm: string,
  limit: number,
  offset: number
) {
  const taxQueries = [];

  if (filters !== null) {
    // Ajouter les catégories si elles existent
    if (filters?.category && filters.category?.terms?.length > 0) {
      const categoryTerms = filters.category.terms
        .map((f: string) => `"${f}"`)
        .join(", ");
      taxQueries.push(`{
      taxonomy: ${filters.category.taxonomy}, 
      field: SLUG, 
      terms: [${categoryTerms}]
      }`);
    }

    // Ajouter les niveaux si ils existent
    if (filters?.niveau && filters.niveau?.terms?.length > 0) {
      const niveauTerms = filters.niveau.terms
        .map((f: string) => `"${f}"`)
        .join(", ");
      taxQueries.push(`{
      taxonomy: ${filters.niveau.taxonomy}, 
      field: SLUG, 
      terms: [${niveauTerms}]
      }`);
    }

    // Ajouter les rythmes si ils existent
    if (filters?.rythme && filters.rythme?.terms?.length > 0) {
      const rythmeTerms = filters.rythme.terms
        .map((f: string) => `"${f}"`)
        .join(", ");
      taxQueries.push(`{
        taxonomy: ${filters.rythme.taxonomy}, 
        field: SLUG, 
        terms: [${rythmeTerms}]
        }`);
    }

    // Ajouter les tags si ils existent
    if (filters?.tag && filters.tag?.terms?.length > 0) {
      const tagTerms = filters.tag.terms
        .map((f: string) => `"${f}"`)
        .join(", ");
      taxQueries.push(`{
          taxonomy: ${filters.tag.taxonomy}, 
          field: SLUG, 
          terms: [${tagTerms}]
          }`);
    }
  }

  // Construire les conditions de recherche
  const searchCondition = searchTerm ? `search: "${searchTerm}"` : "";
  const taxCondition =
    taxQueries.length > 0
      ? `taxQuery: {taxArray: [${taxQueries.join(", ")}]}`
      : "";

  // Combiner les conditions avec des virgules si les deux existent
  const conditions = [searchCondition, taxCondition].filter(Boolean).join(", ");

  return `where: {
    ${conditions}
    offsetPagination: { size: ${limit}, offset: ${offset} }  
    }`;
}
