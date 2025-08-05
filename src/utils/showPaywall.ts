import { User } from "@/types";

export function showPaywall(authorization: string, user: User | null) {
  // Public content so no paywall
  if (authorization === "Publique") {
    return false;
  }

  if (user) {
    // User is logged in so no paywall
    if (authorization === "Connexion requise") {
      return false;
    }

    // User is logged in and has an active subscription so no paywall
    if (authorization === "Abonnement requis" && user?.role === "subscriber") {
      return false;
    }
  }

  return true;
}
