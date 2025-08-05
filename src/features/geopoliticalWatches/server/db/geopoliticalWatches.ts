"use server";
import createApolloClient from "@/lib/apollo-client";
import { generateQuery } from "@/utils/generateQuery";
import { gql } from "@apollo/client";
import { Error, Filters } from "@/types";

export async function getGeopoliticalWatches(
  limit: number = 20,
  filters: Filters | null = null,
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
          veillesGeopolitique(${filterQuery}) {
            nodes {
              id
              title
              slug
              excerpt
              date
              typeDeVeilles {
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
      fetchPolicy: "network-only",
    });

    if (data?.veillesGeopolitique?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune veille géopolitique trouvée",
        data: [],
        pageInfo: null,
      };
    }

    return {
      success: true,
      message: "Veilles géopolitiques récupérées avec succès",
      data: data?.veillesGeopolitique?.nodes,
      pageInfo: data?.veillesGeopolitique?.pageInfo,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des veilles géopolitiques"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des veilles géopolitiques",
      data: [],
      pageInfo: null,
    };
  }
}

export async function getRelatedGeopoliticalWatches(
  slug: string,
  notIn: string,
  limit: number = 4
) {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          veillesGeopolitique(
            where: {
              taxQuery: {
                taxArray: [
                  {
                    taxonomy: TYPEDEVEILLE,
                    field: SLUG,
                    terms: ["${slug}"],
                  },
                ]
              }
              notIn: "${notIn}"
            }
            first: ${limit}
          ) {
            nodes {
              id
              title
              slug
              date
              tags {
                nodes {
                  name
                  slug
                }
              }
              typeDeVeilles {
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
          }
        }
      `,
    });

    if (data?.veillesGeopolitique?.nodes.length === 0) {
      return {
        success: false,
        message: "Veille géopolitique non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Veille géopolitique récupérée avec succès",
      data: data?.veillesGeopolitique?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err.message || "Erreur lors de la récupération des veilles géopolitiques"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des veilles géopolitiques",
      data: [],
    };
  }
}

export async function getGeopoliticalWatch(slug: string) {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          veilleGeopolitique(id: "${slug}", idType: SLUG) {
            contentType {
              node {
                name
              }
            }
            id
            title
            content
            date
            tags {
              nodes {
                name
                slug
              }
            }
            typeDeVeilles {
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

    if (!data?.veilleGeopolitique) {
      return {
        success: false,
        message: "Veille géopolitique non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Veille géopolitique récupérée avec succès",
      data: data?.veilleGeopolitique,
    };
  } catch (error: unknown) {
    const err = error as Error;

    console.log(
      err.message || "Erreur lors de la récupération de la veille géopolitique"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération de la veille géopolitique",
      data: null,
    };
  }
}

export async function getGeopoliticalWatchesTypes() {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          typeDeVeilles {
            nodes {
              id
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.typeDeVeilles?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune veille géopolitique trouvée",
        data: [],
      };
    }

    return {
      success: true,
      message: "Types de veilles géopolitiques récupérées avec succès",
      data: data?.typeDeVeilles?.nodes,
    };
  } catch (error: unknown) {
    const err = error as Error;

    console.log(
      err.message || "Erreur lors de la récupération des veilles géopolitiques"
    );
    return {
      success: false,
      message:
        "Erreur lors de la récupération des types de veilles géopolitiques",
      data: [],
    };
  }
}
