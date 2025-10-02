"use server";

import { newsletterSchema } from "@/lib/zod";
import { Error } from "@/types";
import DOMPurify from "isomorphic-dompurify";
import { InitialState } from "../../types";
import { subscribeToNewsletter as addEmailToMailjet } from "@/utils/mailjet";

export async function subscribeToNewsletter(
  prevState: InitialState,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;

    const sanitizedEmail = DOMPurify.sanitize(email);

    const newsletterValidation = newsletterSchema.safeParse({
      email: sanitizedEmail,
    });

    if (!newsletterValidation.success) {
      return {
        success: false,
        status: 400,
        message: "Paramètres invalides",
        errors: newsletterValidation.error.flatten().fieldErrors,
      };
    }

    const subscription = await addEmailToMailjet(sanitizedEmail);

    if (!subscription?.success) {
      // Gestion spécifique pour email déjà abonné
      if (
        subscription?.status === 400 &&
        (subscription?.message?.includes("déjà abonnée") ||
          subscription?.message?.includes("déjà existant"))
      ) {
        return {
          success: false,
          status: 400,
          message: "Cette adresse email est déjà abonnée à la newsletter",
          errors: { email: ["Cette adresse email est déjà abonnée"] },
        };
      }

      return {
        success: false,
        status: subscription?.status || 500,
        message:
          subscription?.message ||
          "Erreur lors de l'inscription à la newsletter",
        errors: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Inscription à la newsletter réussie",
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.error(
      "Erreur lors de l'inscription à la newsletter:",
      err?.message || err
    );

    return {
      success: false,
      status: 500,
      message: "Une erreur serveur est survenue lors de l'inscription",
      errors: null,
    };
  }
}
