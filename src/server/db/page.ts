"use server";
// This file is used to fetch the page content from the CMS

import { fetchGraphQL } from "@/utils/authFetch";
import { Error } from "@/types";

export async function getPageContent(slug: string) {
  try {
    if (!slug) {
      return {
        success: false,
        status: 400,
        message: "Paramètres manquants",
        data: null,
      };
    }

    const query = `
      query {
        page(id: "${process.env.APOLLO_URI}/${slug}", idType: URI) {
          title
          content
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message: res.message || "Erreur lors de la récupération de la page",
        data: null,
      };
    }

    if (!res?.data?.page) {
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
      data: res?.data?.page,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération de la page"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération de la page",
      data: null,
    };
  }
}
