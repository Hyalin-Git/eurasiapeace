import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { Error } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const stripe = await getStripe();

    const { amount } = await request.json();

    // Create the PaymentIntent server side for security
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Paiement créé avec succès",
        data: paymentIntent,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    const err = e as Error;

    console.log(err?.message || "Erreur lors de la création du paiement");

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la création du paiement",
        data: null,
      },
      { status: 500 }
    );
  }
}
