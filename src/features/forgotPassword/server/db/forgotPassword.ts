"use server";

import { Error } from "@/types";
import moment from "moment";
import {
  fetchGraphQLWithAuth,
  fetchGraphQLWithoutCache,
} from "@/utils/authFetch";

export async function savePasswordResetCode(email: string, code: string) {
  try {
    if (!email || !code) {
      return {
        success: false,
        status: 400,
        message: "Missing parameters",
        data: null,
      };
    }

    const query = `
      mutation CreateUserPasswordReset(
        $email: String!
        $code: String!
        $expiresAt: String!
      ) {
        createUserPasswordReset(
          input: { userEmail: $email, code: $code, expiresAt: $expiresAt }
        ) {
          userPasswordReset {
            id
            userEmail
            code
            createdAt
            expiresAt
          }
        }
      }
    `;

    const res = await fetchGraphQLWithoutCache(query, {
      email: email,
      code: code,
      expiresAt: moment().add(30, "minutes").toISOString(), // Set expiration to 30 minutes from now
    });

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message: res.message || "Failed to save password reset code",
        data: null,
      };
    }

    if (!res?.data?.createUserPasswordReset) {
      return {
        success: false,
        status: 500,
        message: "Failed to save password reset code",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Password reset code saved successfully",
      data: res?.data?.createUserPasswordReset,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      "Error occurred while saving password reset code:",
      err || "An error occurred"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message || "Error occurred while saving password reset code",
      data: null,
    };
  }
}

export async function getPasswordResetCode(code: string) {
  try {
    if (!code) {
      return {
        success: false,
        status: 400,
        message: "Missing parameters",
        data: null,
      };
    }

    const query = `
      query GetUserPasswordReset($code: String!) {
        userPasswordReset(code: $code) {
          id
          userEmail
          code
          createdAt
          expiresAt
        }
      }
    `;

    const res = await fetchGraphQLWithoutCache(query, { code });

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message:
          res.message || "Error occurred while getting password reset code",
        data: null,
      };
    }

    if (!res.data.userPasswordReset) {
      return {
        success: false,
        status: 404,
        message: "Password reset code not found",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Password reset code retrieved successfully",
      data: res.data.userPasswordReset,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error occurred while getting password reset code:",
      err || "An error occurred"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message || "Error occurred while getting password reset code",
      data: null,
    };
  }
}

export async function updateUserPassword(uid: string, newPassword: string) {
  try {
    if (!uid || !newPassword) {
      return {
        success: false,
        status: 400,
        message: "Missing parameters",
        data: null,
      };
    }

    const query = `
      mutation UpdateUserPassword($uid: ID!, $password: String!) {
        updateUser(
          input: {
            id: $uid
            password: $password
            clientMutationId: "updatePassword"
          }
        ) {
          clientMutationId
        }
      }
    `;

    const res = await fetchGraphQLWithAuth(query, {
      uid: uid,
      password: newPassword,
    });

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message: res.message || "Failed to update user password",
        data: null,
      };
    }

    if (!res.data.updateUser) {
      return {
        success: false,
        status: 500,
        message: "Failed to update user password",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Password updated successfully",
      data: res.data.updateUser,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      "Error occurred while updating user password:",
      err || "An error occurred"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "Error occurred while updating user password",
      data: null,
    };
  }
}

export async function deletePasswordResetCode(userEmail: string) {
  try {
    if (!userEmail) {
      return {
        success: false,
        status: 400,
        message: "Missing parameters",
        data: null,
      };
    }

    const query = `
      mutation DeleteUserPasswordReset($userEmail: String!) {
        deleteUserPasswordReset(input: { userEmail: $userEmail }) {
          deleted
        }
      }
    `;

    const res = await fetchGraphQLWithoutCache(query, { userEmail });

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message: res.message || "Failed to delete password reset code",
        data: null,
      };
    }

    if (!res.data.deleteUserPasswordReset?.deleted) {
      return {
        success: false,
        status: 500,
        message: "Failed to delete password reset code",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Password reset code deleted successfully",
      data: res.data.deleteUserPasswordReset,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      "Error occurred while deleting password reset code:",
      err || "An error occurred"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message || "Error occurred while deleting password reset code",
      data: null,
    };
  }
}
