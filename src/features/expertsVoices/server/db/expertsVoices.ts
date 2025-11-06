"use server";

import { generateQuery } from "@/utils/generateQuery";
import { Error, Filters } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getExpertsVoices(
  limit: number = 10,
  filters: Filters | null = null,
  searchTerm: string = "",
  offset: number = 0
) {
  try {
    const filterQuery = generateQuery(filters, searchTerm, limit, offset);

    const query = `
      query {
        laVoixDesExperts(${filterQuery}) {
          nodes {
            id
            title
            excerpt
            slug
            date
            typesExperts {
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
        message:
          res.message || "Erreur lors de la récupération des voix d'experts",
        data: [],
        pageInfo: null,
      };
    }

    if (res?.data?.laVoixDesExperts?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune voix d'expert trouvée",
        data: [],
        pageInfo: null,
      };
    }

    return {
      success: true,
      message: "Voix d'experts récupérées avec succès",
      data: res?.data?.laVoixDesExperts?.nodes,
      pageInfo: res?.data?.laVoixDesExperts?.pageInfo,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des voix d'experts"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des voix d'experts",
      data: [],
      pageInfo: null,
    };
  }
}

export async function getRelatedExpertsVoices(
  slug: string,
  notIn: string,
  limit: number = 4
) {
  try {
    const query = `
      query {
        laVoixDesExperts(
          where: {
            taxQuery: {
              taxArray: [
                {
                  taxonomy: TYPEEXPERT,
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
            excerpt
            slug
            date
            typesExperts {
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
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message ||
          "Erreur lors de la récupération de la voix des experts liés",
        data: [],
      };
    }

    if (res?.data?.laVoixDesExperts?.nodes.length === 0) {
      return {
        success: false,
        message: "Voix des experts liés non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Voix des experts liés récupérée avec succès",
      data: res?.data?.laVoixDesExperts?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err.message || "Erreur lors de la récupération des voix des experts liés"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des voix des experts liés",
      data: [],
    };
  }
}

export async function getExpertVoice(slug: string) {
  try {
    const query = `
      query {
        laVoixDunExpert(id: "${slug}", idType: SLUG) {
          id
          title
          excerpt
          slug
          date
          content
          typesExperts {
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
              description
              customAvatar
            }
          }
          wordCount
          readingTime
          contenuPublic {
            isPublic 
          }
          contentType {
            node {
              name
            }
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message ||
          "Erreur lors de la récupération de la voix d'un expert",
        data: null,
      };
    }

    if (!res?.data?.laVoixDunExpert) {
      return {
        success: false,
        message: "La voix d'un expert non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "La voix d'un expert récupérée avec succès",
      data: res?.data?.laVoixDunExpert,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err?.message || "Erreur lors de la récupération de la voix d'un expert"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération de la voix d'un expert",
      data: null,
    };
  }
}

export async function getTypesExperts() {
  try {
    const query = `
      query {
        typesExperts {
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
          res.message || "Erreur lors de la récupération des types d'experts",
        data: [],
      };
    }

    if (res?.data?.typesExperts?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun type d'expert trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Types d'experts récupérés avec succès",
      data: res?.data?.typesExperts?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des types d'experts"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des types d'experts",
      data: [],
    };
  }
}
