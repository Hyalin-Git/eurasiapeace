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
      return {
        success: false,
        status: subscription?.status || 500,
        message: "Erreur lors de l'inscription à la newsletter",
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
    console.log(
      err?.message ||
        "Une erreur est survenue lors de l'inscription à la newsletter"
    );

    if (err?.message?.includes("Email already exists")) {
      return {
        success: false,
        status: 400,
        message: "Cette adresse email est déjà inscrite à la newsletter",
        errors: { email: ["Cette adresse email est déjà inscrite"] },
      };
    }

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de l'inscription à la newsletter",
      errors: null,
    };
  }
}
