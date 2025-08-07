"use server";

import { Error } from "@/types";
import { fetchGraphQLWithAuth } from "@/utils/authFetch";

export async function findUserIdByCustomerId(customerId: string) {
  try {
    if (!customerId) {
      throw {
        success: false,
        status: 400,
        message: "Customer ID is required",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.WP_API_URL}/get-user-by-customer?customerId=${customerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();

    if (!response.success) {
      throw {
        success: false,
        status: res.status || 500,
        message:
          response.message ||
          "Error occurred while finding user by customer ID",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "User found",
      data: response.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error(
      err?.message || "Error occurred while finding user by customer ID"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message || "Error occurred while finding user by customer ID",
      data: null,
    };
  }
}

export async function findUserByEmail(email: string) {
  try {
    if (!email) {
      return {
        success: false,
        status: 400,
        message: "Missing parameters",
        data: null,
      };
    }

    const query = `
      query GetUserByEmail($email: ID!) {
        user(id: $email, idType: EMAIL) {
          databaseId
        }
      }
    `;

    const res = await fetchGraphQLWithAuth(query, {
      email: email,
    });

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message: res.message || "Error occurred while finding user by email",
        data: null,
      };
    }

    if (!res?.data?.user) {
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
      message: "User found",
      data: res?.data?.user,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error occurred while finding user by email:",
      err || "Unknown error"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "Error occurred while finding user by email",
      data: null,
    };
  }
}
