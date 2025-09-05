"use server";

import { fetchGraphQLWithoutCache } from "@/utils/authFetch";

export async function getUserSubscriptions(userId: string) {
  try {
    if (!userId) {
      return {
        success: false,
        status: 400,
        message: "User ID is required",
        data: null,
      };
    }

    const query = `
    query GetUserSubscriptions($userId: Int!) {
      userSubscriptions(userId: $userId) {
        id
        status
        subscriptionId
        userId
        customerId
        plan
        expiresAt
      }
    }
    `;

    const response = await fetchGraphQLWithoutCache(query, { userId });

    if (!response?.success) {
      return {
        success: false,
        status: response.status || 500,
        message:
          response.message ||
          "Une erreur est survenue lors de la récupération des abonnements de l'utilisateur",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Abonnements de l'utilisateur récupérés avec succès",
      data: response?.data?.userSubscriptions || [],
    };
  } catch (e: unknown) {
    const err = e as Error;

    return {
      success: false,
      status: 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération des abonnements de l'utilisateur",
      data: null,
    };
  }
}
