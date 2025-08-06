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
  const res = await fetch(process.env.NEXT_PUBLIC_WPGRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  return json.data;
}
