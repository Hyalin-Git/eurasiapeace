"use server";

import { sendEmail } from "@/lib/nodemailer";
import {
  passwordResetCodeTemplate,
  passwordResetConfirmationTemplate,
} from "./forgotPasswordTemplates";

export async function sendEmailPasswordReset(email: string, code: string) {
  if (!email || !code) {
    throw new Error("Email and code are required");
  }

  const emailTemplate = passwordResetCodeTemplate(code);

  await sendEmail(
    process.env.EMAIL_FROM || "contact@eurasiapeace.org",
    email,
    emailTemplate.subject,
    emailTemplate.text
  );
}

export async function sendEmailPasswordResetConfirmation(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  const emailTemplate = passwordResetConfirmationTemplate();

  await sendEmail(
    process.env.EMAIL_FROM || "contact@eurasiapeace.org",
    email,
    emailTemplate.subject,
    emailTemplate.text
  );
}
