"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";

interface SubscriptionContextValue {
  subscription: string;
  hasEurasiaPeaceSubscription: boolean;
  hasContributorSubscription: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(
  undefined
);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { user: authUser } = useAuth();
  const [subscription, setSubscription] = useState<string>("Gratuit");
  const [hasEurasiaPeaceSubscription, setHasEurasiaPeaceSubscription] =
    useState<boolean>(false);
  const [hasContributorSubscription, setHasContributorSubscription] =
    useState<boolean>(false);

  useEffect(() => {
    const hasEurasia = authUser?.subscriptions?.some(
      (sub) => sub.subscriptionPlan === "abonnement_eurasiapeace"
    );
    const hasContributor = authUser?.subscriptions?.some(
      (sub) => sub.subscriptionPlan === "abonnement_contributeur_special"
    );

    setHasEurasiaPeaceSubscription(!!hasEurasia);
    setHasContributorSubscription(!!hasContributor);

    if (hasEurasia && hasContributor) {
      setSubscription("EurasiaPeace, Contributeur Spécial");
    } else if (hasEurasia) {
      setSubscription("EurasiaPeace");
    } else {
      setSubscription("Gratuit");
    }
  }, [authUser]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        hasEurasiaPeaceSubscription,
        hasContributorSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription doit être utilisé dans SubscriptionProvider"
    );
  }

  return context;
}
