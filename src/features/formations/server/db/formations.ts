"use server";

import { generateQuery } from "@/utils/generateQuery";
import { Error, Filters } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getFormations(
  limit: number = 10,
  filters: Filters | null = null,
  searchTerm: string = "",
  offset: number = 0
) {
  try {
    const filterQuery = generateQuery(filters, searchTerm, limit, offset);

    const query = `
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
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        status: 500,
        message:
          res.message ||
          "Une erreur est survenue lors de la récupération des formations",
        data: null,
      };
    }

    if (res?.data?.formations?.nodes.length === 0) {
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
      data: res?.data?.formations?.nodes,
      pageInfo: res?.data?.formations?.pageInfo,
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
    const query = `
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
            banner {
              node {
                sourceUrl
                altText
                srcSet
              }
            }
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
                 filePath
                }
              }
            }
            evaluations {
              evaluationsBoxes {
                evaluationTitle
                evaluationDescription
              }
              baremePdf {
                node {
                  filePath
                }
              }
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
                startingDate
                endingDate
              }
            }
            testimonials {
              fullName
              note
              review
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
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        message:
          res.message ||
          "Une erreur est survenue lors de la récupération de la formation",
        data: null,
      };
    }

    if (!res?.data?.formation) {
      return {
        success: false,
        message: "Aucune formation trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: res?.data?.formation,
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
    const query = `
      query {
        typesDeFormations {
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
          res.message ||
          "Une erreur est survenue lors de la récupération des types de formations",
        data: null,
      };
    }

    if (res?.data?.typesDeFormations?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun type de formation trouvé",
        data: null,
      };
    }
    return {
      success: true,
      message: null,
      data: res?.data?.typesDeFormations?.nodes,
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
    const query = `
      query {
        niveauxDeFormation {
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
          res.message ||
          "Une erreur est survenue lors de la récupération des niveaux de formation",
        data: null,
      };
    }

    if (res?.data?.niveauxDeFormation?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun niveau de formation trouvé",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: res?.data?.niveauxDeFormation?.nodes,
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
    const query = `
      query {
        rythmesDeFormation {
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
          res.message ||
          "Une erreur est survenue lors de la récupération des rythmes de formation",
        data: null,
      };
    }

    if (res?.data?.rythmesDeFormation?.nodes.length === 0) {
      return {
        success: false,
        message: "Aucun rythme de formation trouvé",
        data: null,
      };
    }

    return {
      success: true,
      message: null,
      data: res?.data?.rythmesDeFormation?.nodes,
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
