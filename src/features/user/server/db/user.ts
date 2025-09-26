"use server";

import { Error } from "@/types";
import { fetchGraphQLWithAuth } from "@/utils/authFetch";
import DOMPurify from "isomorphic-dompurify";
import { cookies } from "next/headers";

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

export async function updateUserAvatar(uid: string, file: File) {
  try {
    if (!file && !uid) {
      return {
        success: false,
        status: 400,
        message: "File and user ID are required",
        data: null,
      };
    }
    const formData = new FormData();

    formData.append("avatar", file);
    formData.append("userId", uid);
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("authToken")?.value;

    const res = await fetch(`${process.env.WP_API_URL}/upload-avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      credentials: "include",
    });

    if (!res?.ok) {
      return {
        success: false,
        status: res?.status || 500,
        message: "Error occurred while updating user avatar",
        data: null,
      };
    }

    const data = await res.json();

    return {
      success: true,
      status: 200,
      message: "User avatar updated successfully",
      data: data,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.error("Error occurred while updating user avatar:", err);

    return {
      success: false,
      status: 500,
      message: err?.message || "Error occurred while updating user avatar",
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
