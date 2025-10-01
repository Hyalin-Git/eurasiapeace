"use server";

import { generateQuery } from "@/utils/generateQuery";
import { Error, Filters } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getHeroGeoWatch() {
  try {
    // ! Get latest geopolitical watch

    const query = `
      query {
        veillesGeopolitique(first: 1) {
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
          }
        }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message ||
          "Erreur lors de la récupération de la veille géopolitique",
        data: null,
      };
    }

    if (res?.data?.veillesGeopolitique?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune veille géopolitique trouvée",
        data: [],
        pageInfo: null,
      };
    }

    return {
      success: true,
      message: "Post récupéré avec succès",
      data: res?.data?.veillesGeopolitique?.nodes[0],
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err?.message || "Erreur lors de la récupération de la veille géopolitique"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération de la veille géopolitique",
      data: null,
    };
  }
}

export async function getGeopoliticalWatches(
  limit: number = 20,
  filters: Filters | null = null,
  searchTerm: string = "",
  offset: number = 0
) {
  try {
    const filterQuery = generateQuery(filters, searchTerm, limit, offset);

    const query = `
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
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message ||
          "Erreur lors de la récupération des veilles géopolitiques",
        data: [],
        pageInfo: null,
      };
    }

    if (res?.data?.veillesGeopolitique?.nodes.length === 0) {
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
      data: res?.data?.veillesGeopolitique?.nodes,
      pageInfo: res?.data?.veillesGeopolitique?.pageInfo,
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
    const query = `
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
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message ||
          "Erreur lors de la récupération des veilles géopolitiques",
        data: [],
      };
    }

    if (res?.data?.veillesGeopolitique?.nodes.length === 0) {
      return {
        success: false,
        message: "Veille géopolitique non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Veille géopolitique récupérée avec succès",
      data: res?.data?.veillesGeopolitique?.nodes,
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
    const query = `
      query {
        veilleGeopolitique(id: "${slug}", idType: SLUG) {
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
              description
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
          "Erreur lors de la récupération de la veille géopolitique",
        data: null,
      };
    }

    if (!res?.data?.veilleGeopolitique) {
      return {
        success: false,
        message: "Veille géopolitique non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Veille géopolitique récupérée avec succès",
      data: res?.data?.veilleGeopolitique,
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
    const query = `
      query {
        typeDeVeilles {
          nodes {
            id
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
          res.message ||
          "Erreur lors de la récupération des types de veilles géopolitiques",
        data: [],
      };
    }

    if (res?.data?.typeDeVeilles?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune veille géopolitique trouvée",
        data: [],
      };
    }

    return {
      success: true,
      message: "Types de veilles géopolitiques récupérées avec succès",
      data: res?.data?.typeDeVeilles?.nodes,
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
