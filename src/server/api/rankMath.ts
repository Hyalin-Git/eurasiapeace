"use server";

import { Error } from "@/types";

export async function getRankMathData(slug: string) {
  try {
    const res = await fetch(
      `${process.env.APOLLO_URI}/wp-json/rankmath/v1/getHead?url=${process.env.APOLLO_URI}/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: `Erreur lors de la récupération des données Rank Math: ${res.statusText}`,
        data: null,
      };
    }

    const data = await res.json();

    return {
      success: true,
      status: 200,
      message: "Données Rank Math récupérées avec succès",
      data: data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log("An error occurred while fetching Rank Math data:", err);

    return {
      success: false,
      status: 500,
      message: err.message || "An error occurred while fetching Rank Math data",
      data: null,
    };
  }
}
