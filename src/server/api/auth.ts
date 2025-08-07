"use server";

import { Error } from "@/types";
import { cookies } from "next/headers";
import { fetchGraphQLWithoutCache } from "@/utils/authFetch";

export async function verifyToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    const refreshToken = cookieStore.get("rtk")?.value;

    if (!refreshToken) return;

    const res = await fetch(`${process.env.API_URL}/auth/verify-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    // If the response status is 401, it means the token is invalid or expired
    if (res.status === 401) {
      // Attempt to refresh the token
      const refreshTokenData = await refreshAccessToken();

      // If the refresh token is invalid, redirect to login
      if (!refreshTokenData?.success) {
        throw {
          success: false,
          status: refreshTokenData?.status || 500,
          message:
            refreshTokenData?.message ||
            "Une erreur est survenue lors du rafraîchissement du token",
          data: null,
        };
      }

      // Retry the verification with the new token
      return await verifyToken();
    }

    const data = await res.json();

    if (!data?.success) {
      throw {
        success: false,
        status: data?.status || 500,
        message:
          data?.message ||
          "Une erreur est survenue lors de la vérification du token",
        data: null,
      };
    }

    return data;
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Une erreur est survenue lors de la vérification du token"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la vérification du token",
      data: null,
    };
  }
}

export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("rtk")?.value;

    if (!token) {
      throw {
        success: false,
        status: 401,
        message: "Token de rafraîchissement manquant",
        data: null,
      };
    }

    const query = `
      mutation RefreshAuthToken {
        refreshJwtAuthToken(
          input: {
            clientMutationId: "uniqueId"
            jwtRefreshToken: "${token}"
          }
        ) {
          authToken
        }
      }
    `;

    const res = await fetchGraphQLWithoutCache(query);

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 401,
        message: res.message || "Erreur lors du rafraîchissement du token",
        data: null,
      };
    }

    if (!res?.data?.refreshJwtAuthToken?.authToken) {
      throw {
        success: false,
        status: 401,
        message: "Token invalide ou expiré",
        data: null,
      };
    }

    cookieStore.set("authToken", res?.data?.refreshJwtAuthToken?.authToken, {
      httpOnly: true,
      secure: false,
      maxAge: 300, // 300 seconds
      path: "/",
    });

    return {
      success: true,
      status: 200,
      message: "Token rafraîchi avec succès",
      data: res?.data?.refreshJwtAuthToken?.authToken,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors du rafraîchissement du token"
    );

    if (err?.message === "The provided refresh token is invalid") {
      return {
        success: false,
        status: 401,
        message: "Token de rafraîchissement invalide",
        data: null,
      };
    }

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors du rafraîchissement du token",
      data: null,
    };
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("authToken");
    cookieStore.delete("rtk");

    return {
      success: true,
      status: 200,
      message: "Déconnexion réussie",
      data: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Erreur lors de la déconnexion");

    return {
      success: false,
      status: err?.status || 500,
      message: "Erreur lors de la déconnexion",
      data: null,
    };
  }
}
