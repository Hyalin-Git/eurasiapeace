export function showPaywall(authorization: string, hasSubscription: boolean) {
  // Public content so no paywall
  if (authorization === "Public" || authorization === "Publique") {
    return false;
  }

  // User is logged in and has an active subscription so no paywall
  if (authorization === "Abonnement requis" && hasSubscription) {
    return false;
  }

  return true;
}
