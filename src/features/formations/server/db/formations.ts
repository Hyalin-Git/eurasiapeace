"use server";

import createApolloClient from "@/lib/apollo-client";
import { generateQuery } from "@/utils/generateQuery";
import { gql } from "@apollo/client";
import { Error, Filters } from "@/types";

export async function getFormations(
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
          formations(${filterQuery}) {
            nodes {
              id
              title
              slug
              excerpt
              date
              typesDeFormations {
                nodes {
                  name
                  slug
                }
              }
              niveauxDeFormation {
                nodes {
                  name
                  slug
                }
              }
              rythmesDeFormation {
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
              singleFormations {
                apercuFormation {
                  modalite {
                    dureeFormation
                    nombreParticipants
                    rythme
                  }
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

    if (data?.formations?.nodes.length === 0) {
      throw {
        success: false,
        status: 404,
        message: "Aucune formation trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: data?.formations?.nodes,
      pageInfo: data?.formations?.pageInfo,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération des formations"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des formations",
      data: null,
    };
  }
}

export async function getFormation(slug: string) {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          formation(id: "${slug}", idType: SLUG) {
            id
            title
            slug
            excerpt
            date
            typesDeFormations {
              nodes {
                name
                slug
              }
            }
            niveauxDeFormation {
              nodes {
                name
                slug
              }
            }
            rythmesDeFormation {
              nodes {
                name
                slug
              }
            }
            singleFormations {
              apercuFormation {
                texteIntroFormation
                publicsCibles {
                  textePublicsCibles
                }
                modalite {
                  dureeFormation
                  nombreParticipants
                  langue
                  rythme
                  format
                }
                prerequis {
                  textePrerequis
                }
                benefices {
                  texteBenefices
                }
              }
              objectifsPedagogiques {
                texteIntroObjectifs
                objectifs {
                  titreObjectif
                  descriptionObjectif
                }
              }
              programmeFormation {
                texteIntroProgramme
                seances {
                  titreSeance
                  descriptionSeance
                }
                programmePdf {
                  node {
                    link
                  }
                }
              }
              evaluation {
                evaluationRapport
              }
              modalites {
                boiteModalites {
                  titreBoite
                  descriptionModalite
                }
                tarifs {
                  particulierProgressif
                  particulierIntensif
                  entrepriseProgressif
                  entrepriseIntensif
                }
              }
              recapitulatif {
                dates {
                  dateFormation
                }
              }
              formateur {
                nodes {
                  lastName
                  firstName
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      `,
    });

    if (!data?.formation) {
      return {
        success: false,
        message: "Aucune formation trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: data?.formation,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération de la formation"
    );

    return {
      success: false,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération de la formation",
      data: null,
    };
  }
}

export async function getTypesDeFormations() {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          typesDeFormations {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.typesDeFormations?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun type de formation trouvé",
        data: null,
      };
    }
    return {
      success: true,
      message: null,
      data: data?.typesDeFormations?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération des types de formations"
    );

    return {
      success: false,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des types de formations",
      data: null,
    };
  }
}

export async function getNiveauxDeFormation() {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          niveauxDeFormation {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.niveauxDeFormation?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun niveau de formation trouvé",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: data?.niveauxDeFormation?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération des niveaux de formation"
    );

    return {
      success: false,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des niveaux de formation",
      data: null,
    };
  }
}

export async function getRythmesDeFormation() {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          rythmesDeFormation {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.rythmesDeFormation?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun rythme de formation trouvé",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: data?.rythmesDeFormation?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération des rythmes de formation"
    );

    return {
      success: false,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des rythmes de formation",
      data: null,
    };
  }
}
