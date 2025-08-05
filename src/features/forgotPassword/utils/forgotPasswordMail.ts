"use server";

import { sendEmail } from "@/lib/nodemailer";

export async function sendEmailPasswordReset(email: string, code: string) {
  if (!email || !code) {
    throw new Error("Email and code are required");
  }

  const subject = "Réinitialisation de votre mot de passe";
  const text = `Bonjour, voici le code : ${code}`;

  await sendEmail(process.env.EMAIL_FROM, email, subject, text);
}

export async function sendEmailPasswordResetConfirmation(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  const subject = "Confirmation de réinitialisation de votre mot de passe";
  const text = `Bonjour, votre mot de passe a été réinitialisé avec succès.`;

  await sendEmail(process.env.EMAIL_FROM, email, subject, text);
}
