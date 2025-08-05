import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();

    const { lookup_key, userId, subscriptionId, customerId } =
      await request.json();

    if (!userId || !lookup_key) {
      return NextResponse.json(
        {
          success: false,
          message: "Paramètres invalides",
        },
        { status: 400 }
      );
    }

    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId || ""
      );

      if (
        subscription?.status === "active" ||
        subscription?.status === "trialing"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "La subscription est déjà active",
          },
          { status: 400 }
        );
      }
    }

    const prices = await stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ["data.product"],
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      submit_type: "subscribe",
      currency: "eur",
      metadata: {
        userId: userId,
      },
      client_reference_id: customerId || undefined,
      customer: customerId || undefined,
      line_items: [
        {
          price: prices.data[0].id,
          // For usage-based billing, don't pass quantity
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout?canceled=true`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Session de paiement créée avec succès",
        data: session,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    const err = e as ErrorResponse;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la création de la session de paiement"
    );

    return NextResponse.json(
      {
        success: false,
        message:
          err?.message ||
          "Une erreur est survenue lors de la création de la session de paiement",
      },
      { status: 500 }
    );
  }
}
