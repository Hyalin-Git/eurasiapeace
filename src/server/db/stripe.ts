"use server";

import { Error } from "@/types";
import { fetchGraphQLWithoutCache } from "@/utils/authFetch";
import moment from "moment";

export async function saveUserSubscription(
  userId: number,
  customerId: string,
  subscriptionId: string,
  status:
    | "active"
    | "canceled"
    | "past_due"
    | "unpaid"
    | "incomplete"
    | "incomplete_expired"
    | "trialing",
  plan: "abonnement_eurasiapeace" | "abonnement_contributeur_special",
  expiresAt: number
) {
  try {
    if (
      !userId ||
      !customerId ||
      !subscriptionId ||
      !status ||
      !plan ||
      !expiresAt
    ) {
      return {
        success: false,
        status: 500,
        message: "Missing parameters",
        data: null,
      };
    }

    const mutation = `
    mutation createUserSubscription($userId: Int!, $customerId: String!, $subscriptionId: String!, $status: String!, $plan: String!, $expiresAt: String!) {
        createUserSubscription(input: {userId: $userId, customerId: $customerId, subscriptionId: $subscriptionId, status: $status, plan: $plan, expiresAt: $expiresAt}) {
        userSubscription {
            id
            userId
            subscriptionId
            status
            plan
            expiresAt
        }
      }
    }
    `;

    const response = await fetchGraphQLWithoutCache(mutation, {
      userId: userId,
      customerId: customerId,
      subscriptionId: subscriptionId,
      status: status,
      plan: plan,
      expiresAt: moment.unix(expiresAt).utc().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (!response?.success) {
      return {
        success: false,
        status: 500,
        message: "Error saving user subscription",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "User subscription saved successfully",
      data: response.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error("Error saving user subscription:", err);

    return {
      success: false,
      status: 500,
      message: "Error saving user subscription",
      data: null,
    };
  }
}

export async function updateUserSubscription(
  subscriptionId: string,
  status:
    | "active"
    | "canceled"
    | "past_due"
    | "unpaid"
    | "incomplete"
    | "incomplete_expired"
    | "trialing",
  expiresAt: number
) {
  try {
    if (!subscriptionId || !status || !expiresAt) {
      return {
        success: false,
        status: 500,
        message: "Missing parameters",
        data: null,
      };
    }

    const mutation = `
      mutation updateUserSubscription($subscriptionId: String!, $status: String!, $expiresAt: String!) {
        updateUserSubscription(input: {subscriptionId: $subscriptionId, status: $status, expiresAt: $expiresAt}) {
          userSubscription {
            id
            userId
            subscriptionId
            status
            plan
          }
        } 
      }
    `;

    const response = await fetchGraphQLWithoutCache(mutation, {
      subscriptionId: subscriptionId,
      status: status,
      expiresAt: moment.unix(expiresAt).utc().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (!response?.success) {
      return {
        success: false,
        status: 500,
        message: "Error updating user subscription",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "User subscription updated successfully",
      data: response?.data?.updateUserSubscription?.userSubscription,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error("Error updating user subscription:", err);

    return {
      success: false,
      status: 500,
      message: "Error updating user subscription",
      data: null,
    };
  }
}

export async function deleteUserSubscription(
  id: string,
  subscriptionId: string,
  status:
    | "active"
    | "canceled"
    | "past_due"
    | "unpaid"
    | "incomplete"
    | "incomplete_expired"
    | "trialing",
  expiresAt: Date
) {
  try {
    if (!id || !subscriptionId || !status || !expiresAt) {
      return {
        success: false,
        status: 500,
        message: "Missing parameters",
        data: null,
      };
    }

    const mutation = `
      mutation updateUserSubscription($id: ID!, $subscriptionId: String!, $status: String!, $expiresAt: DateTime!) {
        updateUserSubscription(input: {id: $id, subscriptionId: $subscriptionId, status: $status, expiresAt: $expiresAt}) {
          userSubscription {
            id
            userId
            subscriptionId
            status
            plan
          }
        } 
      }
    `;

    const response = await fetchGraphQLWithoutCache(mutation, {
      id: id,
      subscriptionId: subscriptionId,
      expiresAt: expiresAt.toISOString(),
    });

    if (!response?.success) {
      return {
        success: false,
        status: 500,
        message: "Error updating user subscription",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "User subscription updated successfully",
      data: response.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error("Error updating user subscription:", err);

    return {
      success: false,
      status: 500,
      message: "Error updating user subscription",
      data: null,
    };
  }
}
