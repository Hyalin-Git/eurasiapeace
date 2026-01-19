"use server";

import { randomBytes } from "crypto";
import moment from "moment";
import { fetchGraphQLWithoutCache } from "@/utils/authFetch";
import { sanitizeInput } from "@/utils/sanitize";

export async function verifyUserCredentials(email: string, password: string) {
  try {
    // Sanitize the data to prevent XSS attacks
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

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

    const hasCredentialsError =
      res?.message?.includes("Adresse e-mail") ||
      res?.message?.includes("identifiant") ||
      res?.message?.includes("mot de passe");

    if (hasCredentialsError) {
      return {
        success: false,
        status: 401,
        message: "L'adresse e-mail ou le mot de passe est invalide",
        data: null,
      };
    }

    if (!res.success) {
      throw new Error(res.message || "Error verifying user credentials");
    }

    return {
      success: true,
      status: 200,
      message: "User credentials verified successfully",
      data: res.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error occurred while verifying user credentials:",
      err?.message || "An error occurred",
    );

    return {
      success: false,
      status: 500,
      message: "Error occurred while verifying user credentials",
      data: null,
    };
  }
}

export async function createEmailVerification(userEmail: string) {
  if (!userEmail) {
    throw {
      success: false,
      status: 400,
      message: "User email is missing",
    };
  }

  const generateCode = randomBytes(3).toString("hex").toUpperCase();

  const query = `
    mutation createUserVerification(
      $userEmail: String!
      $code: String!
      $expiresAt: String!
    ) {
      createUserVerification(
        input: { userEmail: $userEmail, code: $code, expiresAt: $expiresAt }
      ) {
        clientMutationId
        userVerification {
          id
          userEmail
          code
          expiresAt
          createdAt
        }
      }
    }
  `;

  const res = await fetchGraphQLWithoutCache(query, {
    userEmail: userEmail,
    code: generateCode,
    expiresAt: moment().add(30, "minutes").toISOString(),
  });

  if (!res.success) {
    return {
      success: false,
      status: res.status || 500,
      message:
        res.message || "Erreur lors de la création de la vérification email",
    };
  }

  if (!res?.data?.createUserVerification?.userVerification) {
    return {
      success: false,
      status: 500,
      message: "Erreur lors de la création de la vérification email",
    };
  }

  return {
    success: true,
    status: 200,
    message: "Vérification email créée avec succès",
    data: res.data,
  };
}
