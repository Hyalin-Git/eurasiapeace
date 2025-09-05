"use server";
import { redirect } from "next/navigation";
import { CircleCheck, CircleX, Info } from "lucide-react";
import LinkButton from "@/ui/LinkButton";
import { getStripe } from "@/lib/stripe";

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Paiement réussi !",
    icon: <CircleCheck size={120} className="text-green-600" />,
    bg: "bg-green-50",
    border: "border-green-200",
    textColor: "text-green-800",
  },
  processing: {
    text: "Votre paiement est en cours de traitement...",
    icon: <Info size={120} className="text-blue-600" />,
    bg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-800",
  },
  requires_payment_method: {
    text: "Échec du paiement. Veuillez réessayer.",
    icon: <CircleX size={120} className="text-red-600" />,
    bg: "bg-red-50",
    border: "border-red-200",
    textColor: "text-red-800",
  },
  default: {
    text: "Une erreur est survenue, veuillez réessayer.",
    icon: <CircleX size={120} className="text-gray-500" />,
    bg: "bg-gray-50",
    border: "border-gray-200",
    textColor: "text-gray-800",
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

  const content =
    STATUS_CONTENT_MAP[status as keyof typeof STATUS_CONTENT_MAP] ||
    STATUS_CONTENT_MAP.default;

  return (
    <div
      id="payment-status"
      className={`h-full flex items-center justify-center ${content.bg} transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-md mx-auto rounded-xl shadow-lg border ${content.border} p-8 flex flex-col items-center gap-6`}
      >
        <div id="status-icon" className="mb-2">
          {content.icon}
        </div>
        <h2
          id="status-text"
          className={`text-2xl font-bold mb-2 ${content.textColor}`}
        >
          {content.text}
        </h2>
        <p className="text-base text-center text-gray-700 mb-4">
          {status === "succeeded"
            ? "Nous avons bien reçu votre paiement. Merci pour votre confiance !"
            : status === "processing"
            ? "Nous traitons votre paiement. Vous recevrez une confirmation sous peu."
            : status === "requires_payment_method"
            ? "Votre paiement n'a pas pu aboutir. Merci de vérifier vos informations et de réessayer."
            : "Une erreur est survenue. Veuillez réessayer ou contacter le support."}
        </p>
        <LinkButton href="/" label="Retour à l'accueil" className="w-full" />
      </div>
    </div>
  );
}
