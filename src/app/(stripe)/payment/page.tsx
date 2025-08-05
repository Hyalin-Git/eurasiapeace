"use server";
import { redirect } from "next/navigation";
import { CircleCheck, CircleX, Info } from "lucide-react";
import LinkButton from "@/ui/LinkButton";
import { getStripe } from "@/lib/stripe";

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Paiement réussi",
    icon: (
      <CircleCheck size={250} className=" text-white fill-midnight-green" />
    ),
  },
  processing: {
    text: "Votre paiement est en cours de traitement.",
    icon: <Info size={150} className=" text-midnight-green fill-white" />,
  },
  requires_payment_method: {
    text: "Votre paiement n'a pas été réussi, veuillez réessayer.",
    icon: <CircleX size={150} className=" text-midnight-green fill-white" />,
  },
  default: {
    text: "Une erreur est survenue, veuillez réessayer.",
    icon: <CircleX size={150} className=" text-midnight-green fill-white" />,
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const stripe = await getStripe();
  const { payment_intent: paymentIntentId } = await searchParams;

  if (!paymentIntentId) redirect("/");

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (!paymentIntent) redirect("/");

  const { status } = paymentIntent;

  return (
    <div id="payment-status" className="container h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div id="status-icon">
          {STATUS_CONTENT_MAP[status as keyof typeof STATUS_CONTENT_MAP].icon}
        </div>
        <div className="text-center">
          <h2 id="status-text" className="text-2xl font-bold">
            {STATUS_CONTENT_MAP[status as keyof typeof STATUS_CONTENT_MAP].text}
          </h2>
          <p className="text-lg mb-4">Nous avons bien reçu votre donation.</p>
          <LinkButton href="/" label="Retour à l'accueil" />
        </div>
      </div>
    </div>
  );
}
