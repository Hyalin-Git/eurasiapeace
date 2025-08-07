"use server";

import { randomBytes } from "crypto";
import moment from "moment";
import { fetchGraphQLWithoutCache } from "@/utils/authFetch";

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
    throw {
      success: false,
      status: res.status || 500,
      message:
        res.message || "Erreur lors de la création de la vérification email",
    };
  }

  return res.data;
}
