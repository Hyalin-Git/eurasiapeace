"use server";
import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { Error } from "@/types";

export async function getCultureLinks() {
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          typesDeCulture {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.typesDeCulture?.nodes.length === 0) {
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
      data: data?.typesDeCulture?.nodes,
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
    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          typeDeVeilles {
            nodes {
              name
              slug
            }
          }
        }
      `,
    });

    if (data?.typeDeVeilles?.nodes.length === 0) {
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
      data: data?.typeDeVeilles?.nodes,
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
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des types de formations",
      data: [],
    };
  }
}
