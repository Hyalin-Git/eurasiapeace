"use server";

import { getStripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import { authFetch } from "@/utils/authFetch";
import { Error } from "@/types";

export async function createPaymentIntent(amount: number) {
  try {
    if (!amount || amount <= 0) {
      throw {
        success: false,
        status: 400,
        message: "Montant invalide",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.API_URL}/stripe/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    );

    const response = await res.json();

    if (!response.success) {
      throw {
        success: false,
        status: response.status || 500,
        message:
          response.message ||
          "Une erreur est survenue lors de la création du paiement",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Paiement créé avec succès",
      data: response?.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Une erreur est survenue lors de la création du paiement"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: "Une erreur est survenue lors de la création du paiement",
      data: null,
    };
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const stripe = await getStripe();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const plainSession = JSON.parse(JSON.stringify(session));

    return {
      success: true,
      status: 200,
      message: "Session de paiement récupérée avec succès",
      data: plainSession,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la récupération de la session de paiement"
    );

    return {
      success: false,
      status: 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la récupération de la session de paiement",
      data: null,
    };
  }
}

export async function createPortalSession(customerId: string) {
  try {
    if (!customerId) {
      throw {
        success: false,
        status: 400,
        message: "Paramètres manquants",
        data: null,
      };
    }

    const res = await authFetch(
      `${process.env.API_URL}/stripe/create-portal-session`,
      {
        method: "POST",
        body: JSON.stringify({ customerId }),
      }
    );

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message ||
          "Une erreur est survenue lors de la création de la session de portail",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Session de portail créée avec succès",
      data: res?.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la création de la session de portail"
    );

    return {
      success: false,
      status: 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la création de la session de portail",
      data: null,
    };
  }
}

export async function createPayementCheckout(
  name: string,
  fileUrl: string,
  amount: number
) {
  try {
    const res = await authFetch(
      `${process.env.API_URL}/stripe/create-payment-checkout`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          fileUrl: fileUrl,
          amount: amount,
        }),
      }
    );

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message ||
          "Une erreur est survenue lors de la création de la session de paiement",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Session de paiement créée avec succès",
      data: res?.data,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err?.message ||
        "Une erreur est survenue lors de la création de la session de paiement"
    );

    return {
      success: false,
      status: 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la création de la session de paiement",
      data: null,
    };
  }
}

export async function createSubscriptionCheckout(
  lookup_key: string,
  userId: string,
  userCustomerId: string
) {
  try {
    const res = await authFetch(
      `${process.env.API_URL}/stripe/create-subscription-checkout`,
      {
        method: "POST",
        body: JSON.stringify({
          lookup_key,
          userId,
          userCustomerId,
        }),
      }
    );

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message ||
          "Une erreur est survenue lors de la création de la session de paiement",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Session de paiement créée avec succès",
      data: res?.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la création de la session de paiement"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la création de la session de paiement",
      data: null,
    };
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      throw {
        success: false,
        status: 401,
        message: "Token d'authentification manquant",
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.API_URL}/stripe/cancel-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ subscriptionId }),
      }
    );

    const response = await res.json();

    if (!response.success) {
      throw {
        success: false,
        status: response.status || 500,
        message:
          response.message ||
          "Une erreur est survenue lors de la résiliation de l'abonnement",
        data: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "L'abonnement a été résilié avec succès",
      data: response?.data,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la résiliation de l'abonnement"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la résiliation de l'abonnement",
      data: null,
    };
  }
}
