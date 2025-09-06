"use server";

import { signUpSchema } from "@/lib/zod";
import DOMPurify from "isomorphic-dompurify";
import { Error } from "@/types";
import { InitialState } from "../../types";
import { sendEmail } from "@/lib/nodemailer";
import { createEmailVerification } from "@/server/db/verifications";
import { fetchGraphQLWithoutCache } from "@/utils/authFetch";
import { subscribeToNewsletter } from "@/utils/mailjet";
import { welcomeVerificationEmailTemplate } from "../../utils/signUpEmailsTemplates";

export async function signUp(prevState: InitialState, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const confirmTerms = formData.get("confirm-terms") as string;
    const newsletter = formData.get("newsletter") as string;

    // Sanitize the data to prevent XSS attacks
    const sanitizedFirstName = DOMPurify.sanitize(firstName);
    const sanitizedLastName = DOMPurify.sanitize(lastName);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedConfirmPassword = DOMPurify.sanitize(confirmPassword);

    const validation = signUpSchema.safeParse({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      password: sanitizedPassword,
      confirmPassword: sanitizedConfirmPassword,
      confirmTerms: confirmTerms,
    });

    if (!validation.success) {
      return {
        success: false,
        status: 400,
        message: "Les données renseignées sont invalides",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // If the user subscribed to the newsletter
    if (newsletter === "on") {
      const subscription = await subscribeToNewsletter(sanitizedEmail);

      if (!subscription?.success) {
        return {
          success: false,
          status: subscription?.status || 500,
          message: "Erreur lors de l'inscription à la newsletter",
          formData: formData,
          errors: {
            newsletter: ["Erreur lors de l'inscription à la newsletter"],
          },
        };
      }

      const subject = "Inscription à la newsletter";
      const html = `
      <p>Bonjour ${sanitizedFirstName},</p>
      <p>Merci de vous être inscrit à notre newsletter.</p>
    `;

      await sendEmail(
        "contact@eurasiapeace.org",
        sanitizedEmail,
        subject,
        html
      );
    }

    const query = `
      mutation RegisterUser(
        $email: String!
        $password: String!
        $username: String!
        $firstName: String!
        $lastName: String!
      ) {
        registerUser(
          input: {
            clientMutationId: "registerUser"
            username: $username
            password: $password
            email: $email
            firstName: $firstName
            lastName: $lastName
          }
        ) {
          clientMutationId
          user {
            userId
            firstName
            lastName
            email
          }
        }
      }
    `;

    const res = await fetchGraphQLWithoutCache(query, {
      email: sanitizedEmail,
      password: sanitizedPassword,
      username: sanitizedEmail.split("@")[0],
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
    });

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message: res.message || "Erreur lors de l'inscription",
      };
    }

    if (!res?.data?.registerUser?.user) {
      throw {
        success: false,
        status: 500,
        message: "L'utilisateur n'a pas pu être créé",
      };
    }

    const user = res?.data?.registerUser?.user;

    if (!user) {
      throw {
        success: false,
        status: 500,
        message: "L'utilisateur n'a pas pu être créé",
      };
    }

    const emailVerification = await createEmailVerification(sanitizedEmail);

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
      emailVerification?.data?.createUserVerification?.userVerification?.code;

    const emailTemplate = welcomeVerificationEmailTemplate(
      sanitizedFirstName,
      code,
      process.env.NEXT_PUBLIC_CLIENT_URL || ""
    );

    await sendEmail(
      process.env.EMAIL_FROM || "contact@eurasiapeace.org",
      sanitizedEmail,
      emailTemplate.subject,
      emailTemplate.text
    );

    return {
      success: true,
      status: 200,
      message: "Inscription réussie",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Une erreur est survenue lors de l'inscription"
    );

    if (err?.message?.includes("adresse e-mail")) {
      return {
        success: false,
        status: 409,
        message: "Cette adresse email est déjà utilisée",
        formData: formData,
        errors: {
          email: ["Cette adresse email est déjà utilisée"],
        },
      };
    }

    if (err?.message?.includes("Email already exists")) {
      return {
        success: false,
        status: 409,
        message: "Cette adresse email est déjà inscrite à la newsletter",
        formData: formData,
        errors: {
          newsletter: ["Cette adresse email est déjà inscrite à la newsletter"],
        },
      };
    }

    if (err?.message?.includes("identifiant est déjà utilisé")) {
      return {
        success: false,
        status: 409,
        message: "Cette adresse email est déjà utilisée",
        formData: formData,
        errors: {
          email: ["Cette adresse email est déjà utilisée"],
        },
      };
    }

    return {
      success: false,
      status: 500,
      message: err?.message || "Une erreur est survenue lors de l'inscription",
      formData: formData,
      errors: null,
    };
  }
}
