import { getStripe } from "@/lib/stripe";
import { Error } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();

    const { name, fileUrl, amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      submit_type: "pay",
      currency: "eur",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: name + " - EurasiaPeace PDF",
              description: "Accès au téléchargement du PDF '" + name + "'",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        fileUrl: fileUrl || "N/A",
      },
      success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout-payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout-payment?canceled=true`,
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
    const err = e as Error;

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
