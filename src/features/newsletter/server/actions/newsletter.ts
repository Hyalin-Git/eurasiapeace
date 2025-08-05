"use server";
import { newsletterSchema } from "@/lib/zod";
import { Error } from "@/types";
import Mailjet from "node-mailjet";
import { InitialState } from "../../types";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_API_SECRET as string
);

export async function subscribeToNewsletter(
  prevState: InitialState,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;

    const newsletterValidation = newsletterSchema.safeParse({
      email: email,
    });

    if (!newsletterValidation.success) {
      return {
        success: false,
        status: 400,
        message: "Paramètres invalides",
        errors: newsletterValidation.error.flatten().fieldErrors,
      };
    }

    const request = await mailjet.post("contact", { version: "v3" }).request({
      Email: email,
      IsExcludedFromCampaigns: false,
    });

    if (request?.response?.status !== 201) {
      return {
        success: false,
        status: request?.response?.status || 500,
        message: "Erreur lors de la création du contact",
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
