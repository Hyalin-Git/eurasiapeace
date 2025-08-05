"use server";
import { Error } from "@/types";

export async function verifyRecaptcha(token: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET;

    if (!token) {
      throw {
        success: false,
        message: "Paramètres manquants",
        status: 400,
        data: null,
      };
    }

    const res = await fetch(
      `${process.env.RECAPTCHA_URL}/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();

    console.log(response);

    if (!response.success || response.score < 0.5) {
      throw {
        success: false,
        message: "Captcha invalide",
        status: 400,
        data: response,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Captcha vérifié avec succès",
      data: response,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message ||
        "Une erreur est survenue lors de la vérification du captcha"
    );

    return {
      success: false,
      status: 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de la vérification du captcha",
      data: null,
    };
  }
}
