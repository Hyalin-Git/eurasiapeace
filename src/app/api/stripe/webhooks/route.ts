"use server";

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { findUserIdByCustomerId } from "@/server/api/users";
import { sendEmail } from "@/lib/nodemailer";
import { createPortalSession } from "@/server/api/stripe";

interface ErrorResponse {
  success: boolean;
  message: string;
  data?: null;
}

export async function POST(req: NextRequest) {
  let data;
  let eventType;

  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = await getStripe();

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = (await headers()).get("stripe-signature");

    try {
      event = stripe.webhooks.constructEvent(
        await req.text(),
        signature || "",
        webhookSecret
      );
    } catch (e: unknown) {
      const err = e as ErrorResponse;

      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(`Error message: ${err.message}`);
      return NextResponse.json(
        { message: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured,
    // retrieve the event data directly from the request body.
    const body = await req.json();
    data = body.data;
    eventType = body.type;
  }

  try {
    const customer = await stripe.customers.retrieve(
      data.object.customer as string
    );

    const isFirstInvoice = data.object.billing_reason === "subscription_create";

    switch (eventType) {
      case "checkout.session.completed":
        // Payment is successful and the subscription is created.
        await addUserSubscription(
          data.object.customer,
          data.object.subscription,
          data.object?.metadata?.userId
        );

        console.log(`Checkout session completed: ${data.object.id}`);
        break;
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        await addUserSubscription(
          data.object.customer,
          data.object.subscription,
          data.object?.metadata?.userId
        );

        // Send a confirmation email to the customer.
        if (!("deleted" in customer)) {
          await sendEmail(
            "noreply@eurasiapeace.org",
            customer.email as string,
            isFirstInvoice
              ? "Votre abonnement a été créé avec succès"
              : "Votre abonnement a été renouvelé avec succès",
            `<p>Bonjour ${customer.name},</p>
            ${
              isFirstInvoice
                ? `<p>Merci pour votre abonnement à EurasiaPeace. Votre paiement a été reçu avec succès.</p>`
                : `<p>Votre abonnement a été renouvelé avec succès.</p>`
            }`
          );
        }

        console.log(`Invoice paid for customerId: ${data.object.customer}`);
        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        await removeUserSubscription(data.object.customer as string);

        const portalSession = await createPortalSession(data.object.customer);

        if (!portalSession.success) {
          throw new Error(portalSession.message);
        }

        const emailContent = `
        <p>Bonjour, votre moyen de paiement a échoué.</p>
        <a href="${portalSession.data.url}">Mettre à jour votre méthode de paiement</a>
        `;

        if (!("deleted" in customer)) {
          await sendEmail(
            "noreply@eurasiapeace.org",
            customer.email as string,
            "Votre abonnement a été annulé",
            emailContent
          );
        }

        console.log(
          `Invoice payment failed for customerId: ${data.object.customer}`
        );
        break;
      case "customer.subscription.deleted":
        // The subscription was canceled or expired.
        await removeUserSubscription(data?.object.customer as string);

        if (!("deleted" in customer)) {
          await sendEmail(
            "noreply@eurasiapeace.org",
            customer.email as string,
            "Votre abonnement a été annulé",
            "Nous sommes désolés de vous voir partir. Si vous souhaitez nous faire part de vos commentaires, n'hésitez pas à répondre à cet e-mail."
          );
        }

        console.log(
          `Subscription deleted for customerId: ${data.object.customer}`
        );
      case "payment_intent.succeeded":
        // Handle one-time payments
        console.log(`Payment status: ${data.object.status}`);
        break;
      default:
      // console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 }
    );
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}

async function addUserSubscription(
  customerId: string,
  subscriptionId: string,
  userId: string
) {
  try {
    let uid = userId;

    if (!uid) {
      const { success, data } = await findUserIdByCustomerId(customerId);

      if (!success || !data) {
        throw new Error("User not found for the given customerId");
      }

      uid = data;
    }

    // Sending a request to the WordPress API to update the user role as subscriber
    // Saving the customerId and subscriptionId in the WordPress database as user meta
    const res = await fetch(`${process.env.WP_API_URL}/promote-user`, {
      method: "POST",
      body: JSON.stringify({
        userId: uid,
        customerId: customerId,
        subscriptionId: subscriptionId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response.success) {
      throw new Error(response.message);
    }

    console.log(`Adding subscription for userId: ${userId}`);
  } catch (e: unknown) {
    const err = e as ErrorResponse;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la promotion de l'utilisateur"
    );
  }
}

async function removeUserSubscription(customerId: string) {
  try {
    if (!customerId) {
      throw new Error("Paramètres manquants");
    }

    // Find the userId associated with the customerId
    const { success, data: userId } = await findUserIdByCustomerId(customerId);

    if (!success || !userId) {
      throw new Error("User not found for the given customerId");
    }

    // Sending a request to the WordPress API to remove the user role as subscriber
    const res = await fetch(`${process.env.WP_API_URL}/demote-user`, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response.success) {
      throw new Error(response.message);
    }

    console.log(`Removing subscription for userId: ${userId}`);
  } catch (e: unknown) {
    const err = e as ErrorResponse;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la démotion de l'utilisateur"
    );
  }
}
