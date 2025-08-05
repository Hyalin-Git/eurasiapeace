"use server";

import createApolloClient from "@/lib/apollo-client";
import { Error } from "@/types";
import { gql } from "@apollo/client";
import moment from "moment";

export async function verifyUserEmail(code: string) {
  try {
    if (!code) {
      throw {
        success: false,
        status: 400,
        message: "Verification code is missing",
      };
    }

    const client = createApolloClient();
    const { data } = await client.query({
      query: gql`
        query {
          userVerification(code: "${code}") {
            id
            code
            userEmail
            createdAt
            expiresAt
          }
        }
      `,
    });

    if (!data || !data?.userVerification) {
      throw {
        success: false,
        status: 404,
        message: "Verification code not found or already used",
      };
    }

    const userVerification = data?.userVerification;

    const actualTime = moment().subtract(2, "hours");

    if (moment(userVerification?.expiresAt).isBefore(actualTime)) {
      throw {
        success: false,
        status: 410,
        message: "Verification code has expired",
      };
    }

    // ! Update the user email verification status
    await updateUserEmailVerified(userVerification.userEmail);

    // ! Get all verifications from the users email and delete them
    const { data: verifications } = await client.query({
      query: gql`
        query {
          userVerifications(userEmail: "${userVerification.userEmail}") {
            id
          }
        }
      `,
    });

    const allVerifications = verifications?.userVerifications || [];

    // ! Delete all of the verifications code of the user from the database
    for (const verification of allVerifications) {
      await client.mutate({
        mutation: gql`
          mutation {
            deleteUserVerification(input: { id: ${verification.id} }) {
              deleted
              id
            }
          }
        `,
      });
    }

    return {
      success: true,
      status: 200,
      message: "Email verification successful",
      data: userVerification,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "An error occurred during email verification");

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "An error occurred during email verification",
      data: null,
    };
  }
}

async function updateUserEmailVerified(userEmail: string) {
  try {
    if (!userEmail) {
      throw {
        success: false,
        status: 400,
        message: "User ID is required for email verification update",
      };
    }

    const res = await fetch(
      `${process.env.WP_API_URL}/verify-email?email=${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();

    if (!response.success) {
      throw {
        success: false,
        status: response?.status || 500,
        message:
          response?.message ||
          "Failed to update user email verification status",
      };
    }

    return {
      success: true,
      status: 200,
      message: "User email verification status updated successfully",
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Failed to update user email verification status"
    );

    throw {
      success: false,
      status: err?.status || 500,
      message:
        err?.message || "Failed to update user email verification status",
      data: null,
    };
  }
}
