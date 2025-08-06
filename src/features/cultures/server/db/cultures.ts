"use server";

import createApolloClient from "@/lib/apollo-client";
import { generateQuery } from "@/utils/generateQuery";
import { gql } from "@apollo/client";
import { Error, Filters } from "@/types";

export async function getCultures(
  limit: number = 10,
  filters: Filters,
  searchTerm: string = "",
  page: string = "1"
) {
  try {
    const offset = (parseInt(page) - 1) * limit;
    const filterQuery = generateQuery(filters, searchTerm, limit, offset);

    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
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
    `,
    });

    if (data?.cultures?.nodes.length === 0) {
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
      data: data?.cultures?.nodes,
      pageInfo: data?.cultures?.pageInfo,
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
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
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
      `,
    });

    if (!data?.culture) {
      return {
        success: false,
        message: "Culture non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Culture récupérée avec succès",
      data: data?.culture,
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
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          typesDeCulture {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.typesDeCulture?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun type de culture trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Types de cultures récupérés avec succès",
      data: data?.typesDeCulture?.nodes,
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
