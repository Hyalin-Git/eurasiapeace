"use server";

import { Filters } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";
import { generateQuery } from "@/utils/generateQuery";

export async function getElementPagination(
  type = "posts",
  limit: number = 9,
  filters: Filters | null = null,
  search: string = "",
  offset: number = 0
) {
  try {
    const filterQuery = generateQuery(filters, search, limit, offset);

    const query = `
        query {
          ${type}(${filterQuery}) {
            pageInfo {
              total
            }
          }
        }
      `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Erreur lors de la récupération des posts",
        data: [],
      };
    }

    if (!res?.data?.[type]) {
      return {
        success: false,
        message: "Aucune information de pagination trouvée",
        data: [],
      };
    }

    return {
      success: true,
      message: "Informations de pagination récupérées avec succès",
      data: res?.data?.[type]?.pageInfo,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Erreur lors de la récupération des posts");

    return {
      success: false,
      message: "Erreur lors de la récupération des posts",
      data: [],
    };
  }
}
