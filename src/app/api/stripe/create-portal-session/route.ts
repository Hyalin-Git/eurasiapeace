import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  success: boolean;
  message: string;
  data: null;
}

export async function POST(req: NextRequest) {
  try {
    const stripe = await getStripe();

    const { customerId } = await req.json();

    // managing their billing with the portal.
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId as string,
      return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`, // This is the url to which the customer will be redirected when they're done
    });

    return NextResponse.json(
      {
        success: true,
        message: "Session de portail créée avec succès",
        data: portalSession,
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
        data: null,
      },
      { status: 500 }
    );
  }
}
