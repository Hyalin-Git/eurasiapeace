"use server";

import { Error } from "@/types";
import { InitialState } from "../../types";
import { codeSchema, newsletterSchema, passwordSchema } from "@/lib/zod";
import DOMPurify from "isomorphic-dompurify";
import { randomBytes } from "crypto";
import {
  sendEmailPasswordReset,
  sendEmailPasswordResetConfirmation,
} from "../../utils/forgotPasswordMail";
import {
  deletePasswordResetCode,
  getPasswordResetCode,
  savePasswordResetCode,
  updateUserPassword,
} from "../db/forgotPassword";
import { findUserByEmail } from "@/server/api/users";
import moment from "moment";

export async function sendPasswordResetCode(
  prevState: InitialState,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;

    const sanitizedEmail = DOMPurify.sanitize(email);

    const validation = newsletterSchema.safeParse({
      email: sanitizedEmail,
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

    // ! Check if the user exists in the database before creating a reset code and sending an email
    const user = await findUserByEmail(sanitizedEmail);

    if (!user?.success) {
      return {
        success: false,
        status: user?.status || 404,
        message: user?.message || "Utilisateur non trouvé",
        formData: formData,
        errors: null,
      };
    }

    // ! Create the reset password verification and save it to the database
    const code = randomBytes(2).toString("hex").toUpperCase();

    const savedResetCode = await savePasswordResetCode(sanitizedEmail, code);

    if (!savedResetCode?.success) {
      return {
        success: false,
        status: savedResetCode.status || 500,
        message:
          savedResetCode.message ||
          "Erreur lors de la sauvegarde du code de réinitialisation",
        formData: formData,
        errors: null,
      };
    }

    // ! Send the password reset code
    await sendEmailPasswordReset(sanitizedEmail, code);

    return {
      success: true,
      status: 200,
      message:
        "Un code de réinitialisation a été envoyé à votre adresse e-mail.",
      formData: formData,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err?.message || "An error occurred while sending the password reset code"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "Une erreur est survenue lors de l'envoi du code de réinitialisation",
      formData: formData,
      errors: null,
    };
  }
}

export async function verifyPasswordResetCode(
  prevState: InitialState,
  formData: FormData
) {
  try {
    const code = formData.get("code") as string;

    const sanitizedCode = DOMPurify.sanitize(code);

    const validation = codeSchema.safeParse({
      code: sanitizedCode,
    });

    if (!validation.success) {
      return {
        success: false,
        status: 400,
        message: "Invalid parameters",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // ! Get the password reset code from the database
    const userPasswordReset = await getPasswordResetCode(sanitizedCode);

    if (!userPasswordReset.success) {
      return {
        success: false,
        status: userPasswordReset.status || 404,
        message: userPasswordReset.message || "Password reset code not found",
        formData: formData,
        errors: null,
      };
    }

    // ! Check if the code is valid / expired
    const actualDate = moment().subtract(2, "hours");

    if (actualDate.isAfter(moment(userPasswordReset?.data?.expiresAt))) {
      return {
        success: false,
        status: 410,
        message: "Password reset code has expired",
        formData: formData,
        errors: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Password reset code is valid",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      "An error occurred while verifying the password reset code",
      err || "An error occurred"
    );

    return {
      success: false,
      status: err?.status || 500,
      message:
        err?.message ||
        "An error occurred while verifying the password reset code",
      formData: formData,
      errors: null,
    };
  }
}

export async function resetPassword(
  prevState: InitialState,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 500 Error because email is not supposed to be null (Handled with a useState)
    if (!email) {
      return {
        success: false,
        status: 500,
        message: "Missing parameters",
        formData: formData,
        errors: null,
      };
    }

    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedConfirmPassword = DOMPurify.sanitize(confirmPassword);

    const validation = passwordSchema.safeParse({
      password: sanitizedPassword,
      confirmPassword: sanitizedConfirmPassword,
    });

    if (!validation.success) {
      return {
        success: false,
        status: 400,
        message: "Passwords do not match or are invalid",
        formData: formData,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // ! Get the user by email
    const user = await findUserByEmail(sanitizedEmail);

    if (!user?.success) {
      return {
        success: false,
        status: user?.status || 404,
        message: user?.message || "User not found",
        formData: formData,
        errors: null,
      };
    }

    // ! GraphQL mutation to reset the password in the database
    const updatedUserPassword = await updateUserPassword(
      user.data.databaseId,
      sanitizedPassword
    );

    if (!updatedUserPassword.success) {
      return {
        success: false,
        status: updatedUserPassword.status || 500,
        message:
          updatedUserPassword.message ||
          "Error occurred while resetting the password",
        formData: formData,
        errors: null,
      };
    }

    // ! Clear every password reset code for this user
    const deletedPasswordResetCode = await deletePasswordResetCode(
      sanitizedEmail
    );

    if (!deletedPasswordResetCode.success) {
      return {
        success: false,
        status: deletedPasswordResetCode.status || 500,
        message:
          deletedPasswordResetCode.message ||
          "Error occurred while deleting the password reset code",
        formData: formData,
        errors: null,
      };
    }

    // ! Send a confirmation email to the user
    await sendEmailPasswordResetConfirmation(sanitizedEmail);

    return {
      success: true,
      status: 200,
      message: "Password has been successfully reset",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err?.message || "An error occurred while resetting the password"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: err?.message || "An error occurred while resetting the password",
      formData: formData,
      errors: null,
    };
  }
}
