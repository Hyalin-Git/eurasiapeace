"use server";

import { Error } from "@/types";
import { fetchGraphQLWithAuth } from "@/utils/authFetch";
import DOMPurify from "isomorphic-dompurify";

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
          avatar {
            url
          }
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

export async function getUserByEmail(email: string) {
  try {
    if (!email) {
      return {
        success: false,
        status: 400,
        message: "User email is required",
        data: null,
      };
    }

    const query = `
      query getUser($email: ID!) {
        user(id: $email, idType: EMAIL) {
          databaseId
          lastName
          firstName
          email
          avatar {
            url
          }
          description
          registeredDate
        }
      }
    `;

    const response = await fetchGraphQLWithAuth(query, {
      email: email,
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
      data: response?.data?.user,
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

export async function updateUserRole(userId: number, roles: string[]) {
  try {
    if (!userId || !roles || roles.length === 0) {
      return {
        success: false,
        status: 400,
        message: "User ID and roles are required",
        data: null,
      };
    }

    const mutation = `
    mutation updateUserRole($id: ID!, $roles: [String]) {
      updateUser(input: {id: $id, roles: $roles}) {
        user {
          lastName
          firstName
          roles {
            nodes {
              name
            }
          }
        }
      }
    }
    `;

    const response = await fetchGraphQLWithAuth(mutation, {
      id: userId,
      roles: roles,
    });

    if (!response?.success) {
      return {
        success: false,
        status: 500,
        message: "Error updating user role",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "User role updated successfully",
      data: response?.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error("Error updating user role:", err);

    return {
      success: false,
      status: 500,
      message: "Error updating user role",
      data: null,
    };
  }
}

export async function checkIfEmailExists(email: string) {
  try {
    const sanitizedEmail = DOMPurify.sanitize(email);

    if (!sanitizedEmail) {
      return {
        success: false,
        status: 400,
        message: "Email is required",
        data: null,
      };
    }

    const query = `
      query checkIfEmailExists($email: ID!) {
        user(id: $email, idType: EMAIL) {
          id
        }
      }
    `;

    const response = await fetchGraphQLWithAuth(query, {
      email: sanitizedEmail,
    });

    if (!response?.success) {
      return {
        success: false,
        status: response?.status || 500,
        message:
          response?.message ||
          "Unknown error occurred while checking email existence",
        data: null,
      };
    }

    if (response?.data?.user) {
      return {
        success: false,
        status: 409,
        message: "Email already exists",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Email existence checked successfully",
      data: response.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "An error occurred while checking email existence:",
      err.message
    );

    return {
      success: false,
      status: 500,
      message:
        err.message || "Unknown error occurred while checking email existence",
      data: null,
    };
  }
}
