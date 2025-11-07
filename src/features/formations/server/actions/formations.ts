"use server";

import { sendEmail } from "@/lib/nodemailer";
import { formationSchema } from "@/lib/zod";
import { Error } from "@/types";
import { InitialState } from "../../types";
import { formationEmailTemplate } from "../../utils/formationEmailTemplates";

export async function registerToFormation(
  title: string,
  prevState: InitialState,
  formData: FormData
) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const rgpd = formData.get("rgpd") as string;

    const validation = formationSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
      message,
      rgpd,
    });

    if (!validation.success) {
      return {
        success: false,
        status: 400,
        message: "Invalid form data",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const msgTemplate = formationEmailTemplate(
      title,
      firstName,
      lastName,
      email,
      phone,
      message
    );

    await sendEmail(
      process.env.EMAIL_FROM || "contact@eurasiapeace.org",
      `${process.env.EMAIL_FORMATION}`,
      msgTemplate.subject,
      msgTemplate.text,
      [],
      email
    );

    return {
      success: true,
      status: 200,
      formData: null,
      message: "Registration successful",
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.error(
      "Error registering to formation:",
      err || "An error occurred"
    );

    return {
      success: false,
      status: 500,
      formData: formData,
      message:
        err?.message || "An error occurred while registering to formation",
      errors: null,
    };
  }
}
