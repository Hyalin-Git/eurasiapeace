"use server";
import { Error } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getPublicationsLinks() {
  try {
    const query = `
      query {
        categories {
          nodes {
            slug
            name
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
          "Erreur lors de la récupération des liens des publications",
        data: [],
      };
    }

    if (res?.data?.categories?.nodes.length === 0) {
      throw {
        success: false,
        status: 404,
        message: "Aucun lien de publications trouvé",
        data: [],
      };
    }

    return {
      success: true,
      status: 200,
      message: "Lien de publications récupérés avec succès",
      data: res?.data?.categories?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Erreur lors de la récupération des liens de publications"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: "Erreur lors de la récupération des liens de publications",
      data: [],
    };
  }
}

export async function getExpertVoicesLinks() {
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
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message ||
          "Erreur lors de la récupération des liens de la voix des experts",
        data: [],
      };
    }

    if (res?.data?.typesExperts?.nodes.length === 0) {
      throw {
        success: false,
        status: 404,
        message: "Aucun lien de la voix des experts trouvé",
        data: [],
      };
    }

    return {
      success: true,
      status: 200,
      message: "Lien de la voix des experts récupérés avec succès",
      data: res?.data?.typesExperts?.nodes,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Erreur lors de la récupération des liens de la voix des experts"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        "Erreur lors de la récupération des liens de la voix des experts",
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
