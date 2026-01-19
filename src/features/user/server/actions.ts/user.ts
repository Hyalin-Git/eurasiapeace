"use server";

import { fetchGraphQLWithAuth } from "@/utils/authFetch";
import { InitialState } from "../../types";
import {
  signInSchema,
  updatePasswordSchema,
  updateUserSchema,
} from "@/lib/zod";
import { sanitizeInput } from "@/utils/sanitize";
import { verifyUserCredentials } from "@/server/db/verifications";
import { sendEmail } from "@/lib/nodemailer";
import {
  passwordChangeSuccessTemplate,
  updateEmailTemplate,
} from "../../utils/userEmailTemplates";
import { checkIfEmailExists } from "../db/user";

export async function updateUser(prevState: InitialState, formData: FormData) {
  try {
    const uid = formData.get("uid") as string;
    const lastName = formData.get("last-name") as string;
    const firstName = formData.get("first-name") as string;
    const description = formData.get("description") as string;

    // Sanitize the data to prevent XSS attacks
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedDescription = sanitizeInput(description);

    if (!uid) {
      return {
        success: false,
        status: 400,
        message: "Les données fournies sont invalides",
        formData: formData,
        errors: null,
      };
    }

    const validation = updateUserSchema.safeParse({
      lastName: sanitizedLastName,
      firstName: sanitizedFirstName,
      description: sanitizedDescription,
    });

    if (!validation.success) {
      return {
        success: false,
        status: 400,
        message: "Les données fournies sont invalides",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const mutation = `
      mutation UpdateUser($uid: ID!, $lastName: String!, $firstName: String!, $description: String) {
        updateUser(
          input: {
            id: $uid
            lastName: $lastName
            firstName: $firstName
            description: $description
            clientMutationId: "updateUser"
          }
        ) {
          clientMutationId
        }
      }
    `;

    const response = await fetchGraphQLWithAuth(mutation, {
      uid: uid,
      lastName: sanitizedLastName,
      firstName: sanitizedFirstName,
      description: sanitizedDescription,
    });

    if (!response?.success) {
      return {
        success: false,
        status: response?.status || 500,
        message: response?.message || "Failed to update user",
        formData: formData,
        errors: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Utilisateur mis à jour avec succès",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error occurred while updating user:",
      err || "An error occurred",
    );

    return {
      success: false,
      status: 500,
      message: err?.message || "Error occurred while updating user",
      formData: null,
      errors: null,
    };
  }
}

export async function createUserEmailUpdate(
  prevState: InitialState,
  formData: FormData,
) {
  try {
    const currentEmail = formData.get("current-email") as string;
    const firstName = formData.get("first-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Sanitize the data to prevent XSS attacks
    const sanitizedCurrentEmail = sanitizeInput(currentEmail);
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (sanitizedEmail === sanitizedCurrentEmail) {
      return {
        success: false,
        status: 400,
        message: "Les données fournies sont invalides",
        formData: formData,
        errors: {
          email: [
            "L'adresse e-mail ne peut pas être la même que l'adresse e-mail actuelle",
          ],
        },
      } as InitialState;
    }

    const validation = signInSchema.safeParse({
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    if (!validation?.success) {
      return {
        success: false,
        status: 400,
        message: "Les données fournies sont invalides",
        formData: formData,
        errors: {
          password: ["Le mot de passe est invalide"],
        },
      };
    }

    const { success, status, message } = await verifyUserCredentials(
      sanitizedCurrentEmail,
      sanitizedPassword,
    );

    if (!success) {
      if (status === 401) {
        return {
          success: false,
          status: 401,
          message: "L'adresse e-mail ou le mot de passe est invalide",
          formData: formData,
          errors: {
            password: ["Le mot de passe est invalide"],
          },
        };
      }

      return {
        success: false,
        status: status || 500,
        message: message || "L'adresse e-mail ou le mot de passe est invalide",
        formData: formData,
        errors: null,
      };
    }

    // ! Checks if email already exists
    const emailExists = await checkIfEmailExists(sanitizedEmail);

    if (!emailExists.success && emailExists.status === 409) {
      return {
        success: false,
        status: 409,
        message: "L'adresse e-mail est déjà utilisée",
        formData: formData,
        errors: {
          email: ["L'adresse e-mail est déjà utilisée"],
        },
      };
    }

    if (!emailExists?.success) {
      return {
        success: false,
        status: emailExists.status || 500,
        message:
          emailExists.message ||
          "Unknown error occurred while checking email existence",
        formData: formData,
        errors: null,
      };
    }

    // TODO: Create email reset token

    const template = updateEmailTemplate(
      sanitizedFirstName,
      sanitizedEmail,
      currentEmail,
      "https://example.com/validate-email",
    );

    await sendEmail(
      process.env.EMAIL_FROM || "contact@eurasiapeace.org",
      sanitizedEmail,
      template.subject,
      template.text,
    );

    return {
      success: true,
      status: 200,
      message:
        "Un e-mail de confirmation a été envoyé à votre nouvelle adresse e-mail.",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error occurred while sending email:",
      err?.message || "An error occurred while sending email",
    );

    return {
      success: false,
      status: 500,
      message: err?.message || "Error occurred while sending email",
      formData: null,
      errors: null,
    };
  }
}

export async function updateUserPassword(
  prevState: InitialState,
  formData: FormData,
) {
  try {
    const uid = formData.get("uid") as string;
    const email = formData.get("email") as string;
    const currentPassword = formData.get("current-password") as string;
    const newPassword = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (!uid || !email) {
      return {
        success: false,
        status: 400,
        message: "Missing parameters",
        formData: formData,
        errors: null,
      };
    }

    const validation = updatePasswordSchema.safeParse({
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    if (!validation?.success) {
      return {
        success: false,
        status: 400,
        message: "Les données fournies sont invalides",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const isVerified = await verifyUserCredentials(email, currentPassword);

    if (!isVerified?.success && isVerified?.status === 401) {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials",
        formData: formData,
        errors: {
          currentPassword: ["Mot de passe incorrect"],
        },
      };
    }

    if (currentPassword === newPassword) {
      return {
        success: false,
        status: 400,
        message:
          "Le nouveau mot de passe ne peut pas être identique à l'ancien",
        formData: formData,
        errors: {
          newPassword: [
            "Le nouveau mot de passe ne peut pas être identique à l'ancien",
          ],
        },
      };
    }

    const query = `
      mutation UpdateUserPassword($uid: ID!, $password: String!) {
        updateUser(
          input: {
            id: $uid
            password: $password
            clientMutationId: "updatePassword"
          }
        ) {
          clientMutationId
        }
      }
    `;

    const res = await fetchGraphQLWithAuth(query, {
      uid: uid,
      password: newPassword,
    });

    if (!res.success) {
      throw new Error(res.message || "Error updating user password");
    }

    if (!res?.data?.updateUser) {
      throw new Error("Error updating user password");
    }

    const template = passwordChangeSuccessTemplate(email);

    await sendEmail(
      process.env.EMAIL_FROM || "contact@eurasiapeace.org",
      email,
      template?.subject,
      template?.text,
    );

    return {
      success: true,
      status: 200,
      message: "Password updated successfully",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      "Error occurred while updating user password:",
      err || "An error occurred",
    );

    return {
      success: false,
      status: 500,
      message: err?.message || "Error occurred while updating user password",
      formData: formData,
      errors: null,
    };
  }
}
