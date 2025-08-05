"use server";

import Stripe from "stripe";

export async function getStripe() {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

  return stripe;
}
