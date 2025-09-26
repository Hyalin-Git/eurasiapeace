"use server";

import { signInSchema } from "@/lib/zod";
import DOMPurify from "isomorphic-dompurify";
import { cookies } from "next/headers";
import { Error } from "@/types";
import { InitialState } from "../../types";
import { checkUserEmailVerified } from "../api/signIn";
import { fetchGraphQLWithoutCache } from "@/utils/authFetch";

export async function signIn(prevState: InitialState, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Sanitize the data to prevent XSS attacks
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    const validation = signInSchema.safeParse({
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    if (!validation.success) {
      return {
        success: false,
        status: 400,
        message: "Les données renseignées sont invalides",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const query = `
      mutation LoginUser($username: String!, $password: String!) {
        login(
          input: {
            clientMutationId: "uniqueId"
            username: $username
            password: $password
          }
        ) {
          authToken
          refreshToken
          clientMutationId
          user {
            id
            email
            lastName
            firstName
          }
        }
      }
    `;

    const res = await fetchGraphQLWithoutCache(query, {
      username: sanitizedEmail,
      password: sanitizedPassword,
    });

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message: res.message || "Erreur lors de la connexion",
        formData: formData,
        errors: null,
      };
    }

    // ! Check if the user has a verified email before logging in
    const emailVerification = await checkUserEmailVerified(sanitizedEmail);

    if (!emailVerification?.success) {
      throw {
        success: false,
        status: 400,
        message:
          emailVerification?.message || "Email verification check failed",
        formData: formData,
        errors: null,
      };
    }

    if (emailVerification?.data?.emailVerified === false) {
      return {
        success: false,
        status: 403,
        message: "Adresse e-mail non vérifiée",
        formData: formData,
        errors: {
          email: ["Veuillez vérifier votre adresse e-mail"],
        },
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("authToken", res.data.login.authToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 300, // 300 seconds
      path: "/",
    });

    cookieStore.set("rtk", res.data.login.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    return {
      success: true,
      status: 200,
      message: "Connexion réussie",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Une erreur est survenue lors de la connexion");

    const hasCredentialsError =
      err?.message?.includes("Adresse e-mail") ||
      err?.message?.includes("identifiant") ||
      err?.message?.includes("mot de passe") ||
      err?.message?.includes("username") ||
      err?.message?.includes("password");

    if (hasCredentialsError) {
      return {
        success: false,
        status: 401,
        message: "L'adresse e-mail ou le mot de passe est invalide",
        formData: formData,
        errors: {
          email: ["L'adresse e-mail ou le mot de passe est invalide"],
        },
      };
    }

    return {
      success: false,
      status: 500,
      message: err?.message || "Une erreur est survenue lors de la connexion",
      formData: formData,
      errors: null,
    };
  }
}
