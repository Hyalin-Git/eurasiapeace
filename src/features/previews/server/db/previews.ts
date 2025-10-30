"use server";

import { Error } from "@/types";
import { fetchGraphQLWithAuth } from "@/utils/authFetch";
import { isNumeric } from "@/utils/isNumeric";

export async function getPostPreview(id: string) {
  try {
    const isNum = isNumeric(id);

    if (!isNum) {
      return {
        success: false,
        message: "ID invalide",
        data: null,
      };
    }

    const query = `
          query {
            post(id: ${id}, idType: DATABASE_ID, asPreview: true) {
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
              categories {
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
              acfFields {
                pdf {
                  node {
                    filePath
                  }
                }
              }
              wordCount
              readingTime
              contenuPublic {
                isPublic 
              }
            }
          }
        `;

    const res = await fetchGraphQLWithAuth(query);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Erreur lors de la récupération du post",
        data: null,
      };
    }

    if (!res?.data?.post) {
      return {
        success: false,
        message: "Post non trouvé",
        data: null,
      };
    }

    return {
      success: true,
      message: "Post récupéré avec succès",
      data: res?.data?.post,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error("Error fetching post preview:", err);

    return {
      success: false,
      message: "Erreur lors de la récupération du post",
      data: null,
    };
  }
}

export async function getGeoWatchPreview(id: string) {
  try {
    const isNum = isNumeric(id);

    if (!isNum) {
      return {
        success: false,
        message: "ID invalide",
        data: null,
      };
    }

    const query = `
          query {
            veilleGeopolitique(id: ${id}, idType: DATABASE_ID, asPreview: true) {
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

    const res = await fetchGraphQLWithAuth(query);

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
  } catch (e: unknown) {
    const err = e as Error;

    console.error("Error fetching geo watch preview:", err);

    return {
      success: false,
      message: "Erreur lors de la récupération du geo watch",
      data: null,
    };
  }
}

export async function getExpertVoicePreview(id: string) {
  try {
    const isNum = isNumeric(id);

    if (!isNum) {
      return {
        success: false,
        message: "ID invalide",
        data: null,
      };
    }

    const query = `
          query {
            laVoixDunExpert(id: ${id}, idType: DATABASE_ID, asPreview: true) {
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

    const res = await fetchGraphQLWithAuth(query);

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

    console.error("Error fetching expert voice preview:", err);

    return {
      success: false,
      message: "Erreur lors de la récupération de la voix d'expert",
      data: null,
    };
  }
}
