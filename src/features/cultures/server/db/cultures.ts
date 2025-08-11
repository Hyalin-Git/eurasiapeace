"use server";

import { generateQuery } from "@/utils/generateQuery";
import { Error, Filters } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getCultures(
  limit: number = 10,
  filters: Filters | null = null,
  searchTerm: string = "",
  offset: number = 0
) {
  try {
    const filterQuery = generateQuery(filters, searchTerm, limit, offset);

    const query = `
      query {
        cultures(${filterQuery}) {
          nodes {
            id
            title
            excerpt
            slug
            date
            typesDeCulture {
              nodes {
                name
                slug
              }
            }
            tags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            contentType {
              node {
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
            total
            hasPreviousPage
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Erreur lors de la récupération des cultures",
        data: [],
        pageInfo: null,
      };
    }

    if (res?.data?.cultures?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune culture trouvée",
        data: [],
        pageInfo: null,
      };
    }

    return {
      success: true,
      message: "Cultures récupérées avec succès",
      data: res?.data?.cultures?.nodes,
      pageInfo: res?.data?.cultures?.pageInfo,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Erreur lors de la récupération des cultures");

    return {
      success: false,
      message: "Erreur lors de la récupération des cultures",
      data: [],
      pageInfo: null,
    };
  }
}

export async function getCulture(slug: string) {
  try {
    const query = `
      query {
        culture(id: "${slug}", idType: SLUG) {
          id
          title
          excerpt
          slug
          date
          content
          typesDeCulture {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              avatar {
                url
              }
              firstName
              lastName
            }
          }
          wordCount
          readingTime
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Erreur lors de la récupération de la culture",
        data: null,
      };
    }

    if (!res?.data?.culture) {
      return {
        success: false,
        message: "Culture non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Culture récupérée avec succès",
      data: res?.data?.culture,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(err?.message || "Erreur lors de la récupération de la culture");

    return {
      success: false,
      message: "Erreur lors de la récupération de la culture",
      data: null,
    };
  }
}

export async function getTypesDeCulture() {
  try {
    const query = `
      query {
        typesDeCulture {
          nodes {
            name
            slug
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message || "Erreur lors de la récupération des types de cultures",
        data: [],
      };
    }

    if (res?.data?.typesDeCulture?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun type de culture trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Types de cultures récupérés avec succès",
      data: res?.data?.typesDeCulture?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des types de cultures"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des types de cultures",
      data: [],
    };
  }
}
