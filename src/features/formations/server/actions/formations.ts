"use server";

import { sendEmail } from "@/lib/nodemailer";
import { formationSchema } from "@/lib/zod";
import { Error } from "@/types";
import { InitialState } from "../../types";

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

    const subject =
      "Nouvelle demande de participation à la formation : " + title;

    const msgTemplate = `
        <h1>${subject}</h1>
  
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong> ${message}</p>
      `;

    await sendEmail(email, `${process.env.EMAIL_FROM}`, subject, msgTemplate);

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
