"use server";
import createApolloClient from "@/lib/apollo-client";
import { generateQuery } from "@/utils/generateQuery";
import { gql } from "@apollo/client";
import { Error, Filters } from "@/types";

export async function getPosts(
  limit: number = 10,
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
              author {
                node {
                  avatar {
                    url
                  }
                  firstName
                  lastName
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

    if (data?.posts?.nodes.length === 0) {
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
      data: data?.posts?.nodes,
      pageInfo: data?.posts?.pageInfo,
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
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
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
      `,
    });

    if (data?.posts?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun post trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Posts récupérés avec succès",
      data: data?.posts?.nodes,
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
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
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
      `,
    });

    if (!data?.post) {
      return {
        success: false,
        message: "Post non trouvé",
        data: null,
      };
    }

    return {
      success: true,
      message: "Post récupéré avec succès",
      data: data?.post,
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
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          categories(first: 100) {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.categories?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucune catégorie trouvée",
        data: [],
      };
    }

    return {
      success: true,
      message: "Catégories récupérées avec succès",
      data: data?.categories?.nodes,
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

// // Get tags
export async function getTags() {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          tags(first: 100) {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.tags?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun tag trouvé",
        data: [],
      };
    }

    return {
      success: true,
      message: "Tags récupérés avec succès",
      data: data?.tags?.nodes,
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
