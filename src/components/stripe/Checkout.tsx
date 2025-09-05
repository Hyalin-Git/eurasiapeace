"use client";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeElementsOptions,
  StripePaymentElementOptions,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import Button from "@/ui/Button";
import { Loader2 } from "lucide-react";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

function PaymentForm({ buttonText }: { buttonText: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  // Nouvel état pour surveiller si le formulaire est complet
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Une erreur est survenue");
    } else {
      setMessage("Une erreur est survenue");
    }

    setIsLoading(false);
  };

  // Fonction pour gérer les changements dans le PaymentElement
  const handlePaymentElementChange = (e: StripePaymentElementChangeEvent) => {
    setIsFormComplete(e.complete);

    // Optionnel : effacer les messages d'erreur quand l'utilisateur modifie le formulaire
    if (message) {
      setMessage("");
    }
  };

  const paymentElementOptions = {
    layout: "accordion",
    wallets: {
      applePay: "auto",
      googlePay: "auto",
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className="text-red-500 text-sm bg-red-100 p-2 rounded-md mt-2 mb-2"
        >
          {message}
        </div>
      )}
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions as StripePaymentElementOptions}
        onChange={handlePaymentElementChange}
      />
      <Button
        type="submit"
        disabled={isLoading || !stripe || !elements || !isFormComplete}
        className="w-full h-12 mt-4 text-lg"
      >
        <div id="button-text">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            buttonText
          )}
        </div>
      </Button>
    </form>
  );
}

export default function Checkout({
  clientSecret,
  buttonText,
}: {
  clientSecret: string;
  buttonText: string;
}) {
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#084854",
      colorText: "#2a303b",
    },
  };
  return (
    <Elements
      stripe={stripePromise}
      options={{ appearance, clientSecret } as StripeElementsOptions}
    >
      <PaymentForm buttonText={buttonText} />
    </Elements>
  );
}
