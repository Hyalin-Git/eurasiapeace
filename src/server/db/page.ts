"use server";
// This file is used to fetch the page content from the CMS

import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";

interface ErrorResponse {
  success: boolean;
  status?: number;
  message: string;
  data?: null;
}

export async function getPageContent(slug: string) {
  try {
    if (!slug) {
      throw {
        success: false,
        status: 400,
        message: "Paramètres manquants",
        data: null,
      };
    }

    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          page(id: "${process.env.APOLLO_URI}/${slug}", idType: URI) {
            title
            content
        }
      }
      `,
    });

    if (!data?.page) {
      return {
        success: false,
        status: 404,
        message: "Page non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Page récupérée avec succès",
      data: data?.page,
    };
  } catch (e: unknown) {
    const err = e as ErrorResponse;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération de la page des mentions légaless"
    );

    return {
      success: false,
      message:
        "Une erreur est survenue lors de la récupération de la page des mentions légaless",
      data: null,
    };
  }
}
