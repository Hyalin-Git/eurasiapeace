"use server";

import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { randomBytes } from "crypto";
import moment from "moment";

export async function createEmailVerification(userEmail: string) {
  if (!userEmail) {
    throw {
      success: false,
      status: 400,
      message: "User email is missing",
    };
  }

  const generateCode = randomBytes(3).toString("hex").toUpperCase();

  const client = createApolloClient();
  const { data } = await client.mutate({
    mutation: gql`
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
    `,
    variables: {
      userEmail: userEmail,
      code: generateCode,
      expiresAt: moment().add(30, "minutes").toISOString(),
    },
  });

  return data;
}
