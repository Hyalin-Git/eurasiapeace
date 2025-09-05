"use server";
import { sendEmail } from "@/lib/nodemailer";
import { contactSchema } from "@/lib/zod";
import { Error } from "@/types";
import DOMPurify from "isomorphic-dompurify";
import { InitialState } from "../../types";
import { contactEmailTemplate } from "../../utils/contactEmailTemplate";

export async function sendContact(prevState: InitialState, formData: FormData) {
  try {
    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const rgpd = formData.get("rgpd") as string;

    // Sanitize the data to prevent XSS attacks
    const sanitizedMessage = DOMPurify.sanitize(message);
    const sanitizedSubject = DOMPurify.sanitize(subject);
    const sanitizedLastName = DOMPurify.sanitize(lastName);
    const sanitizedFirstName = DOMPurify.sanitize(firstName);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPhone = DOMPurify.sanitize(phone);

    // Validate the data with zod
    const validatedFields = contactSchema.safeParse({
      lastName: sanitizedLastName,
      firstName: sanitizedFirstName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      rgpd: rgpd,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        status: 400,
        message: "Les données renseignées sont invalides",
        formData: formData,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { data } = validatedFields;

    const contactTemplate = contactEmailTemplate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    const res = await sendEmail(
      email,
      process.env.EMAIL_FROM as string,
      contactTemplate.subject,
      contactTemplate.text
    );

    if (!res.success) {
      throw {
        success: false,
        status: res.status || 500,
        message:
          res.message || "Une erreur est survenue lors de l'envoi du mail",
        formData: formData,
        errors: null,
      };
    }

    return {
      success: true,
      status: 200,
      message: "Email envoyé avec succès",
      formData: null,
      errors: null,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Une erreur est survenue lors de l'envoi du mail"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: "Une erreur est survenue lors de l'envoi du mail",
      formData: formData,
      errors: null,
    };
  }
}
