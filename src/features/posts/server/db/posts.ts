"use server";

import { generateQuery } from "@/utils/generateQuery";
import { Error, Filters } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getPosts(
  limit: number = 10,
  filters: Filters | null = null,
  searchTerm: string = "",
  page: string = "1"
) {
  try {
    const offset = (parseInt(page) - 1) * limit;

    const filterQuery = generateQuery(filters, searchTerm, limit, offset);

    const query = `
     query {
          posts(${filterQuery}) {
            nodes {
              id
              title
              excerpt
              slug
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
        message: res.message || "Erreur lors de la récupération des posts",
        data: [],
        pageInfo: null,
      };
    }

    if (res?.data?.posts?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun post trouvé",
        data: [],
        pageInfo: null,
      };
    }

    return {
      success: true,
      message: "Posts récupérés avec succès",
      data: res?.data?.posts?.nodes,
      pageInfo: res?.data?.posts?.pageInfo,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(err?.message || "Erreur lors de la récupération des posts");

    return {
      success: false,
      message: "Erreur lors de la récupération des posts",
      data: [],
      pageInfo: null,
    };
  }
}

export async function getRelatedPosts(
  slug: string,
  notIn: string,
  limit: number = 4
) {
  try {
    const query = `
      query {
        posts(where: { categoryName: "${slug}", notIn: "${notIn}" }, first: ${limit}) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
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
        message: res.message || "Erreur lors de la récupération des posts",
        data: [],
      };
    }

    if (res?.data?.posts?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun post trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Posts récupérés avec succès",
      data: res?.data?.posts?.nodes,
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

export async function getPost(slug: string) {
  try {
    const query = `
      query {
        post(id: "${slug}", idType: SLUG) {
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

    const res = await fetchGraphQL(query);

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

    console.log(err?.message || "Erreur lors de la récupération du post");

    return {
      success: false,
      message: "Erreur lors de la récupération du post",
      data: null,
    };
  }
}

// Get categories
export async function getCategories() {
  try {
    const query = `
      query {
        categories(first: 100) {
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
        message: res.message || "Erreur lors de la récupération des catégories",
        data: [],
      };
    }

    if (res?.data?.categories?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune catégorie trouvée",
        data: [],
      };
    }

    return {
      success: true,
      message: "Catégories récupérées avec succès",
      data: res?.data?.categories?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des catégories"
    );

    return {
      success: false,
      message: "Erreur lors de la récupération des catégories",
      data: [],
    };
  }
}

export async function getTags() {
  try {
    const query = `
      query {
        tags(first: 100) {
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
        message: res.message || "Erreur lors de la récupération des tags",
        data: [],
      };
    }

    if (res?.data?.tags?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun tag trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Tags récupérés avec succès",
      data: res?.data?.tags?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Erreur lors de la récupération des tags");

    return {
      success: false,
      message: "Erreur lors de la récupération des tags",
      data: [],
    };
  }
}
