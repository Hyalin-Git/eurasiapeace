"use server";
import { Error } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getCultureLinks() {
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
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message || "Erreur lors de la récupération des liens de cultures",
        data: [],
      };
    }

    if (res?.data?.typesDeCulture?.nodes.length === 0) {
      throw {
        success: false,
        status: 404,
        message: "Aucun lien de culture trouvé",
        data: [],
      };
    }

    return {
      success: true,
      status: 200,
      message: "Lien de cultures récupérés avec succès",
      data: res?.data?.typesDeCulture?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des liens de cultures"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: "Erreur lors de la récupération des liens de cultures",
      data: [],
    };
  }
}

export async function getGeopoliticalWatchLinks() {
  try {
    const query = `
      query {
        typeDeVeilles {
          nodes {
            name
            slug
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message ||
          "Erreur lors de la récupération des veilles géopolitiques",
        data: [],
      };
    }

    if (res?.data?.typeDeVeilles?.nodes.length === 0) {
      throw {
        success: false,
        status: 404,
        message: "Aucune veille géopolitique trouvée",
        data: [],
      };
    }

    return {
      success: true,
      status: 200,
      message: "Types de veilles géopolitiques récupérées avec succès",
      data: res?.data?.typeDeVeilles?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err.message || "Erreur lors de la récupération des veilles géopolitiques"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        "Erreur lors de la récupération des types de veilles géopolitiques",
      data: [],
    };
  }
}

export async function getFormationLinks() {
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
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message ||
          "Une erreur est survenue lors de la récupération des types de formations",
        data: [],
      };
    }

    if (res?.data?.typesDeFormations?.nodes.length === 0) {
      throw {
        success: false,
        status: 404,
        message: "Aucun lien de formations trouvé",
        data: [],
      };
    }

    return {
      success: true,
      status: 200,
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
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des types de formations",
      data: [],
    };
  }
}
