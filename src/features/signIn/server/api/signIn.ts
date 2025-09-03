"use server";

import { sendEmail } from "@/lib/nodemailer";
import { createEmailVerification } from "@/server/db/verifications";
import { Error } from "@/types";
import { fetchGraphQLWithAuth } from "@/utils/authFetch";

export async function checkUserEmailVerified(userEmail: string) {
  try {
    if (!userEmail) {
      return {
        success: false,
        status: 400,
        message: "User email is required",
      };
    }

    const query = `
     query getUserEmailVerification($email: ID!) {
      user (id: $email, idType: EMAIL) {
        emailVerified
      }
    }
    `;

    const res = await fetchGraphQLWithAuth(query, {
      email: userEmail,
    });

    if (!res.success) {
      return {
        success: false,
        status: res.status,
        message: "Email verification check failed",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Email verification status retrieved",
      data: res?.data?.user,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "An error occurred while checking email verification status"
    );

    return {
      success: false,
      status: 500,
      message:
        err?.message ||
        "An error occurred while checking email verification status",
      data: null,
    };
  }
}

export async function resendVerificationEmail(userEmail: string) {
  try {
    const emailVerification = await createEmailVerification(userEmail);

    if (!emailVerification.success) {
      throw {
        success: false,
        status: emailVerification.status || 500,
        message:
          emailVerification.message ||
          "Erreur lors de la création de la vérification email",
      };
    }

    const code =
      emailVerification.data.createUserVerification.userVerification.code;

    const subject = "Veuillez confirmer votre adresse e-mail";
    const html = `
          <p>Bonjour,</p>
          <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse e-mail :</p>
          <a href="${process.env.NEXT_PUBLIC_CLIENT_URL}/verification/${code}">Confirmer mon adresse e-mail</a>
        `;

    await sendEmail("contact@eurasiapeace.org", userEmail, subject, html);

    return {
      success: true,
      status: 200,
      message: "Verification email resent successfully",
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err.message || "An error occurred while resending verification email"
    );

    return {
      success: false,
      status: 500,
      message:
        err.message || "An error occurred while resending verification email",
    };
  }
}
