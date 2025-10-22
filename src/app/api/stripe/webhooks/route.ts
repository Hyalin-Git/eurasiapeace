"use server";

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/nodemailer";
import {
  saveUserSubscription,
  updateUserSubscription,
} from "@/server/db/stripe";
import {
  stripeInvoiceFailed,
  stripeInvoicePaid,
  stripePDFPurchaseTemplate,
} from "@/features/stripe/utils/stripeEmailTemplates";
import moment from "moment";
import "moment/locale/fr";
import { updateUserRole } from "@/features/user/server/db/user";
import { getUserSubscriptions } from "@/features/subscriptions/server/db";
import { Error } from "@/types";

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
      const err = e as Error;

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
    switch (eventType) {
      case "customer.subscription.created":
        // ! Save the user subscription in the DB

        let userId;

        // Essayer de récupérer le userId depuis les métadonnées d'abord
        if (data?.object?.metadata?.userId) {
          userId = data?.object?.metadata?.userId;
          console.log(`UserID trouvé dans les métadonnées: ${userId}`);
        } else {
          // Sinon, essayer de récupérer depuis la session checkout
          const sessions = await stripe.checkout.sessions.list({
            subscription: data?.object?.id,
            limit: 1,
          });

          const session = sessions.data[0];
          userId = session?.metadata?.userId;
          console.log(`UserID trouvé dans la session: ${userId}`);
        }

        // Vérifier qu'on a bien un userId
        if (!userId) {
          console.error(
            "❌ UserID manquant pour l'abonnement:",
            data?.object?.id
          );
          return NextResponse.json(
            { message: "UserID manquant" },
            { status: 400 }
          );
        }

        await saveUserSubscription(
          Number(userId),
          data?.object?.customer || "",
          data?.object?.id || "",
          data?.object?.status || "active",
          data?.object?.items?.data[0]?.price?.lookup_key || "",
          data?.object?.current_period_end
        );

        // ! IF CONTRIBUTOR SUBSCRIPTION THEN CHANGE USER ROLE TO AUTHOR IN WP
        if (
          data?.object?.items?.data[0]?.price?.lookup_key ===
          "abonnement_contributeur_special"
        ) {
          await updateUserRole(Number(userId), [
            "author",
            "subscriber",
            "contributor",
          ]);
        }

        console.log(
          `Subscription created for customerId: ${data?.object?.customer}`
        );
        break;
      case "customer.subscription.updated":
        console.log("Subscription updated");
        // The subscription was updated or renewed.
        // ! Update the user subscription in the DB

        console.log(data?.object);

        // Si userId est présent dans les métadonnées, c'est une migration
        // On essaie d'abord de mettre à jour, puis de créer si ça échoue
        if (data?.object?.metadata?.userId) {
          const userIdFromMeta = data?.object?.metadata?.userId;
          console.log(
            `Migration: userId ${userIdFromMeta} ajouté dans les métadonnées`
          );

          // Essayer de mettre à jour d'abord
          const updateResult = await updateUserSubscription(
            data?.object?.id, // subscriptionId
            data?.object?.status, // status
            data?.object?.current_period_end // expiresAt
          );

          // Si la mise à jour échoue (abonnement n'existe pas), créer l'abonnement
          if (!updateResult?.success || !updateResult?.data) {
            console.log(
              `L'abonnement n'existe pas encore, création dans la DB...`
            );
            await saveUserSubscription(
              Number(userIdFromMeta),
              data?.object?.customer || "",
              data?.object?.id || "",
              data?.object?.status || "active",
              data?.object?.items?.data[0]?.price?.lookup_key || "",
              data?.object?.current_period_end
            );
          } else {
            console.log(
              `Abonnement mis à jour avec succès pour userId ${userIdFromMeta}`
            );
          }
        } else {
          // Sinon, simple mise à jour
          await updateUserSubscription(
            data?.object?.id, // subscriptionId
            data?.object?.status, // status
            data?.object?.current_period_end // expiresAt
          );
        }

        console.log(
          `Subscription updated for customerId: ${data?.object?.customer}`
        );
        break;
      case "customer.subscription.deleted":
        // The subscription was canceled or expired.
        // ! Update the user subscription in the DB

        const deletedSubscription = await updateUserSubscription(
          data?.object?.id, // subscriptionId
          data?.object?.status, // status
          data?.object?.current_period_end // expiresAt
        );

        // ! IF CONTRIBUTOR SUBSCRIPTION THEN CHANGE USER ROLE TO USER IN WP
        if (
          deletedSubscription?.data?.plan === "abonnement_contributeur_special"
        ) {
          await updateUserRole(Number(deletedSubscription?.data?.userId), [
            "subscriber",
          ]);
        }

        // ! IF EURASIA PEACE SUB IS STOPPED, CANCEL ALL OTHER ACTIVE SUBSCRIPTIONS
        if (deletedSubscription?.data?.plan === "abonnement_eurasiapeace") {
          // GET ALL USER SUBSCRIPTIONS FROM THE DB AND CANCEL THEM WITH STRIPE API
          const userSubscriptions = await getUserSubscriptions(
            deletedSubscription?.data?.userId
          );

          console.log(
            "Annulation automatique des autres abonnements pour l'utilisateur:",
            deletedSubscription?.data?.userId
          );

          for (const sub of userSubscriptions?.data || []) {
            // Cancel all active subscriptions except the one that was just deleted
            if (sub.subscriptionId !== data?.object?.id) {
              try {
                const cancelledSubscription = await stripe.subscriptions.update(
                  sub.subscriptionId,
                  { cancel_at_period_end: true }
                );

                await updateUserSubscription(
                  sub.subscriptionId, // subscriptionId
                  "canceled", // status
                  data?.object?.current_period_end // expiresAt
                );

                console.log(
                  `Abonnement ${sub.subscriptionId} (${sub.plan}) annulé automatiquement:`,
                  cancelledSubscription
                );
              } catch (error) {
                console.error(
                  `Erreur lors de l'annulation de l'abonnement ${sub.subscriptionId}:`,
                  error
                );
              }
            }
          }
        }

        console.log(
          `Subscription deleted for customerId: ${data?.object?.customer}`
        );
        break;
      case "checkout.session.completed":
        if (data?.object?.mode === "payment") {
          const purchaseTemplate = stripePDFPurchaseTemplate(
            data?.object?.customer_details?.email,
            data?.object?.metadata?.fileUrl || "",
            data?.object?.amount_total || 0,
            moment().format("MMMM Do YYYY, h:mm:ss")
          );

          await sendEmail(
            process?.env?.EMAIL_FROM,
            data?.object?.customer_details?.email,
            purchaseTemplate.subject,
            purchaseTemplate.text,
            [
              {
                filename: `PDF-${data?.object?.metadata?.fileUrl}`,
                path: data?.object?.metadata?.fileUrl,
                contentType: "application/pdf",
              },
            ]
          );
        }

        console.log(" Checkout session completed");
        break;
      case "invoice.paid":
        // ! Send an email to the customer that their invoice has been paid

        const invoicePaidTemplate = stripeInvoicePaid(
          data?.object?.customer_email,
          data?.object?.lines?.data[0]?.price?.lookup_key || "", // subscription
          data?.object?.amount_paid, // amount in cents
          data?.object?.number, // invoice number
          moment().format("MMMM Do YYYY, h:mm:ss")
        );

        await sendEmail(
          process?.env?.EMAIL_FROM,
          data?.object?.customer_email,
          invoicePaidTemplate.subject,
          invoicePaidTemplate.text,
          [
            {
              filename: `invoice-${data?.object?.number}.pdf`,
              path: data?.object?.invoice_pdf,
              contentType: "application/pdf",
            },
          ]
        );

        console.log(`Invoice paid for customerId: ${data?.object?.customer}`);
        break;
      case "invoice.payment_failed":
        // ! Send an email to the customer that their payment has failed

        const invoiceFailedTemplate = stripeInvoiceFailed(
          data?.object?.customer_email,
          data?.object?.lines?.data[0]?.price?.lookup_key || "",
          data?.object?.amount_due,
          data?.object?.number,
          moment().format("MMMM Do YYYY, h:mm:ss")
        );

        await sendEmail(
          process?.env?.EMAIL_FROM,
          data?.object?.customer_email,
          invoiceFailedTemplate.subject,
          invoiceFailedTemplate.text
        );

        console.log(
          `Invoice payment failed for customerId: ${data?.object?.customer}`
        );
        break;
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
