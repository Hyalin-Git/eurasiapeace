"use client";

import { createSubscriptionCheckout } from "@/server/api/stripe";
import { Check, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Subscription } from "../types";
import Toast from "@/components/Toast";
import { useSubscription } from "@/context/SubscriptionContext";
import { useAuth } from "@/context/AuthProvider";

export default function SubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  const { user } = useAuth();
  const { hasContributorSubscription, hasEurasiaPeaceSubscription } =
    useSubscription();
  const [showToast, setShowToast] = useState<boolean>(false);
  const router = useRouter();

  const colorVariants = {
    forceBlue: {
      text: "text-btn-force-blue",
      bg: "bg-btn-force-blue",
      border: "border-btn-force-blue",
      hover: "hover:bg-btn-force-blue/80",
    },

    purple: {
      text: "text-btn-purple",
      bg: "bg-btn-purple",
      border: "border-btn-purple",
      hover: "hover:bg-btn-purple/80",
    },
  };

  async function handleCheckoutSession(lookup_key: string) {
    const userId = user?.id || "";
    const userCustomerId = user?.customerId || "";

    // Handle error if user is not authenticated
    if (!user) {
      return router.push("/connexion?redirect_url=/abonnements");
    }

    if (
      lookup_key === "abonnement_contributeur_special" &&
      !user?.canSubscribeContributor
    ) {
      return router.push("/contact");
    }

    // Handle error if lookup_key is not provided
    if (!lookup_key) {
      setShowToast(true);
      return;
    }

    const { data, success, status } = await createSubscriptionCheckout(
      lookup_key,
      userId,
      userCustomerId
    );

    // Handle error if not authenticated (refresh token failed)
    if (!success && status === 401) {
      return router.push("/connexion?redirect_url=/abonnements");
    }

    // Handle error if session creation failed
    if (!success && status !== 401) {
      setShowToast(true);
      return;
    }

    // Redirect to Stripe checkout session
    router.push(data?.url || "");
  }

  const isUserSubscriber =
    hasEurasiaPeaceSubscription &&
    subscription.title === "Abonnement EurasiaPeace";

  const isUserContributor =
    hasContributorSubscription &&
    subscription.title === "Abonnement Contributeur Spécial";

  function handleDisplayBtn() {
    if (subscription.title === "Abonnement EurasiaPeace") {
      if (isUserSubscriber) {
        return (
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
            Déjà abonné <CheckCircle size={16} />
          </div>
        );
      } else {
        return (
          <button
            className={`w-full ${
              colorVariants[subscription.color].bg
            } cursor-pointer text-white px-6 py-3 rounded-lg font-semibold ${
              colorVariants[subscription.color].hover
            } transition-colors duration-300`}
            onClick={() => handleCheckoutSession(subscription.lookup_key)}
          >
            {subscription.buttonText}
          </button>
        );
      }
    }

    if (subscription.title === "Abonnement Contributeur Spécial") {
      if (isUserContributor) {
        return (
          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
            Déjà abonné <CheckCircle size={16} />
          </div>
        );
      } else {
        return (
          <button
            className={`w-full ${
              colorVariants[subscription.color].bg
            } cursor-pointer text-white px-6 py-3 rounded-lg font-semibold ${
              colorVariants[subscription.color].hover
            } transition-colors duration-300`}
            onClick={() => handleCheckoutSession(subscription.lookup_key)}
          >
            {user?.canSubscribeContributor
              ? "S'abonner maintenant"
              : subscription.buttonText}
          </button>
        );
      }
    }
  }

  return (
    <div
      className={`relative flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl max-w-3xl shadow-lg p-8 border-2 ${
        colorVariants[subscription.color].border
      } transition-shadow duration-300 hover:shadow-xl`}
    >
      {/* Top title */}
      <div className="absolute z-10 -top-4 left-1/2 transform -translate-x-1/2">
        <span
          className={`${
            colorVariants[subscription.color].bg
          } text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap`}
        >
          {subscription.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-4 text-center mb-6 h-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {subscription.title}
        </h3>
        <div
          className={`text-4xl font-bold ${
            colorVariants[subscription.color].text
          } mb-2`}
        >
          <span>{subscription.price}</span>
          <span className="text-lg text-gray-500">
            /{subscription.duration}
          </span>
        </div>

        {/* Subscription action button */}
        {handleDisplayBtn()}

        <p className="text-xs text-gray-500 text-center font-bold">
          {subscription.moreInfo}
        </p>
      </div>

      {/* Services */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Services inclus :</h4>
        <ul className="space-y-3">
          {subscription.services.map((service, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className={`w-5 h-5 ${
                  colorVariants[subscription.color].text
                } mt-0.5 flex-shrink-0`}
              />
              <span className="text-sm">{service}</span>
            </li>
          ))}
        </ul>
      </div>

      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        success={false}
        message="Une erreur est survenue de notre côté. Veuillez réessayer."
      />
    </div>
  );
}
