"use server";

import { refreshAccessToken } from "@/server/api/auth";
import { Error } from "@/types";
import { cookies } from "next/headers";

export async function authFetch(url: string, options: RequestInit) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("authToken")?.value;

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const { success, status, message } = await refreshAccessToken();

      if (!success) {
        return {
          success: false,
          status: status || 401,
          message: message || "Erreur lors de la rafraîchissement du token",
          data: null,
        };
      }

      return await authFetch(url, options);
    }

    const data = await res.json();

    return data;
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Une erreur est survenue lors de la requête");

    return {
      success: false,
      message: err?.message || "Une erreur est survenue lors de la requête",
      data: null,
    };
  }
}

export async function fetchGraphQL(
  query: string,
  variables?: Record<string, unknown>
) {
  try {
    if (!query) {
      return {
        success: false,
        status: 400,
        message: "Query is required",
        data: null,
      };
    }

    const res = await fetch(`${process.env.APOLLO_URI}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      cache: "force-cache",
    });

    const json = await res.json();

    if (json?.errors) {
      return {
        success: false,
        status: 500,
        message: json.errors
          .map((error: { message: string }) => error.message)
          .join(", "),
        data: null,
      };
    }

    return {
      success: true,
      status: res.status,
      message: json?.message || "Data fetched successfully",
      data: json?.data || null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.error("GraphQL fetch error:", err.message || "Unknown error");

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "Error fetching data",
      data: null,
    };
  }
}

export async function fetchGraphQLWithoutCache(
  query: string,
  variables?: Record<string, unknown>
) {
  try {
    if (!query) {
      return {
        success: false,
        status: 400,
        message: "Query is required",
        data: null,
      };
    }

    const res = await fetch(`${process.env.APOLLO_URI}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      return {
        success: false,
        status: 500,
        message: json.errors
          .map((error: { message: string }) => error.message)
          .join(", ") as string,
        data: null,
      };
    }

    return {
      success: true,
      status: res.status,
      message: "Data fetched successfully",
      data: json?.data || null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.error("GraphQL fetch error:", err.message || "Unknown error");

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "Error fetching data",
      data: null,
    };
  }
}

export async function fetchGraphQLWithAuth(
  query: string,
  variables?: Record<string, unknown>
) {
  try {
    if (!query) {
      return {
        success: false,
        status: 400,
        message: "Query is required",
        data: null,
      };
    }

    const auth = Buffer.from(
      `${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`
    ).toString("base64");

    const res = await fetch(`${process.env.APOLLO_URI}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json?.errors) {
      return {
        success: false,
        status: 500,
        message: json.errors
          .map((error: { message: string }) => error.message)
          .join(", ") as string,
        data: null,
      };
    }

    return {
      success: true,
      status: res.status,
      message: "Data fetched successfully",
      data: json?.data || null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.error("GraphQL fetch error:", err.message || "Unknown error");

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "Error fetching data",
      data: null,
    };
  }
}
