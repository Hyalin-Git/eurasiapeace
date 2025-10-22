"use server";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

interface ErrorResponse {
  success: boolean;
  status?: number;
  message: string;
  data?: null;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const refreshToken = cookieStore.get("rtk")?.value;

  // Routes non accessibles si l'utilisateur est connecté
  const unauthenticatedRoutes = ["/connexion", "/inscription"];

  // Si l'utilisateur est connecté et qu'il tente d'accéder à une route non accessible, on le redirige vers la page d'accueil
  if (authToken && unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const authenticatedRoutes = ["/mon-compte"];

  if (
    authenticatedRoutes.includes(request.nextUrl.pathname) &&
    !authToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }

  // Routes API accessibles uniquement si l'utilisateur est connecté
  const authenticatedApiRoutes = [
    "/api/stripe/create-checkout-session",
    "/api/stripe/create-portal-session",
    "/api/stripe/cancel-subscription",
  ];

  // Si l'utilisateur tente d'accéder à une route API qui nécessite une authentification
  if (authenticatedApiRoutes.includes(request.nextUrl.pathname)) {
    try {
      // Vérifier d'abord si l'utilisateur a un token
      const accessToken = request.headers.get("Authorization")?.split(" ")[1];

      const res = await fetch(`${process.env.API_URL}/auth/verify-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (res.status === 401) {
        return NextResponse.json(
          {
            success: false,
            message: "Token expiré ou non valide",
          },
          { status: 401 }
        );
      }

      return NextResponse.next();
    } catch (e: unknown) {
      const err = e as ErrorResponse;

      return NextResponse.json(
        {
          success: false,
          message:
            err.message ||
            "Une erreur est survenue lors de la vérification du token",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/connexion",
    "/inscription",
    "/mon-compte",
    "/api/stripe/create-checkout-session",
    "/api/stripe/create-portal-session",
    "/api/stripe/cancel-subscription",
  ],
};
