"use server";

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

interface ErrorResponse {
  success: boolean;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();

    const { subscriptionId } = await request.json();

    await stripe.subscriptions.cancel(subscriptionId);

    const res = await fetch(
      `http://192.168.1.21:8085/wp-json/custom/v1/demote-user`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: 1385,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();

    if (!response.success) {
      throw new Error(response.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "L'abonnement a été résilié avec succès",
        data: response,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    const err = e as ErrorResponse;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la résiliation de l'abonnement"
    );

    return NextResponse.json(
      {
        success: false,
        message:
          err?.message ||
          "Une erreur est survenue lors de la résiliation de l'abonnement",
      },
      { status: 500 }
    );
  }
}
