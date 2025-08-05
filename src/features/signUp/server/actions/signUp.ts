"use server";

import { signUpSchema } from "@/lib/zod";
import DOMPurify from "isomorphic-dompurify";
import { Error } from "@/types";
import { InitialState } from "../../types";
import { sendEmail } from "@/lib/nodemailer";
import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { createEmailVerification } from "@/server/db/verifications";

export async function signUp(prevState: InitialState, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const confirmTerms = formData.get("confirm-terms") as string;

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

    const client = createApolloClient();
    const { data } = await client.mutate({
      mutation: gql`
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
      `,
      variables: {
        email: sanitizedEmail,
        password: sanitizedPassword,
        username: sanitizedEmail.split("@")[0],
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
      },
    });

    if (!data?.registerUser?.user) {
      throw {
        success: false,
        status: 500,
        message: "L'utilisateur n'a pas pu être créé",
      };
    }

    const user = data?.registerUser?.user;

    if (!user) {
      throw {
        success: false,
        status: 500,
        message: "L'utilisateur n'a pas pu être créé",
      };
    }

    const emailVerification = await createEmailVerification(sanitizedEmail);

    const code = emailVerification.createUserVerification.userVerification.code;

    const subject = "Veuillez confirmer votre adresse e-mail";
    const html = `
      <p>Bonjour ${sanitizedFirstName},</p>
      <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse e-mail :</p>
      <a href="${process.env.NEXT_PUBLIC_CLIENT_URL}/verification/${code}">Confirmer mon adresse e-mail</a>
    `;

    await sendEmail("contact@eurasiapeace.org", sanitizedEmail, subject, html);

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
