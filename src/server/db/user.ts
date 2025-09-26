"use server";

import { Error } from "@/types";
import { fetchGraphQLWithAuth } from "@/utils/authFetch";

export async function getUser(uid: string) {
  try {
    if (!uid) {
      return {
        success: false,
        status: 400,
        message: "User ID is required",
        data: null,
      };
    }

    const query = `
      query getUser($id: ID!) {
        user(id: $id, idType: DATABASE_ID) {
          databaseId
          lastName
          firstName
          email
          customAvatar 
          description
          registeredDate
        }
      }
    `;

    const response = await fetchGraphQLWithAuth(query, {
      id: uid,
    });

    if (!response?.success) {
      return {
        success: false,
        status: response?.status || 500,
        message:
          response?.message ||
          "Unknown error occurred while fetching user data",
        data: null,
      };
    }

    if (!response?.data?.user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "User data fetched successfully",
      data: response.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log("An error occurred while fetching user data:", err.message);

    return {
      success: false,
      status: 500,
      message: err.message || "Unknown error occurred while fetching user data",
      data: null,
    };
  }
}
