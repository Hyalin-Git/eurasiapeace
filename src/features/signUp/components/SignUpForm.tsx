"use client";

import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import Button from "@/ui/Button";
import ErrorMessage from "@/ui/ErrorMessage";
import Link from "next/link";
import { InitialState } from "../types";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useActionState, useRef, useState } from "react";
import { signUp } from "../server/actions/signUp";
import { verifyRecaptcha } from "@/server/api/recaptcha";
import { LogIn } from "lucide-react";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function SignUpForm({ redirect }: { redirect?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const [reCaptchaMessage, setReCaptchaMessage] = useState<string>("");
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const errors = state?.errors;
  const hasServerError = state.status === 500;
  const hasNewsletterError = errors?.newsletter?.[0];

  const firstNameError = errors?.firstName?.[0];
  const lastNameError = errors?.lastName?.[0];
  const emailError = errors?.email?.[0];
  const passwordError = errors?.password?.[0];
  const confirmPasswordError = errors?.confirmPassword?.[0];
  const confirmTermsError = errors?.confirmTerms?.[0];

  async function handleSubmitSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      e.preventDefault();
      setIsCaptchaValid(false);

      if (!executeRecaptcha) {
        setReCaptchaMessage(
          "Nous n'avons pas pu vérifier que vous êtes humain"
        );
        throw new Error("reCAPTCHA not yet available");
      }

      const getRecaptchaToken = await executeRecaptcha("signUp");

      if (!getRecaptchaToken) {
        setReCaptchaMessage(
          "Nous n'avons pas pu vérifier que vous êtes humain"
        );
        throw new Error("reCAPTCHA not yet available");
      }

      const { success, data } = await verifyRecaptcha(
        getRecaptchaToken as string
      );

      if (!success) {
        setReCaptchaMessage(
          "Nous n'avons pas pu vérifier que vous êtes humain"
        );
        throw new Error("Captcha invalide, score: " + data?.score);
      }

      setIsCaptchaValid(true);

      formRef?.current?.requestSubmit();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div className="mt-8 shadow rounded-lg p-8 bg-background-secondary border border-gray-200 w-full max-w-130">
      {/* Form */}
      <Form formRef={formRef} action={formAction}>
        <div className="flex gap-8">
          <FormFields
            label="Prénom"
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            required={true}
            defaultValue={state.formData?.get("firstName") as string}
            error={firstNameError}
          />

          <FormFields
            label="Nom"
            id="lastName"
            type="text"
            placeholder="Votre nom"
            required={true}
            defaultValue={state.formData?.get("lastName") as string}
            error={lastNameError}
          />
        </div>

        <FormFields
          label="Adresse email"
          id="email"
          type="email"
          placeholder="email@exemple.com"
          required={true}
          defaultValue={state.formData?.get("email") as string}
          error={emailError}
        />

        <FormFields
          label="Mot de passe"
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          required={true}
          defaultValue={state.formData?.get("password") as string}
          error={passwordError}
        />

        <FormFields
          label="Confirmer le mot de passe"
          id="confirm-password"
          type="password"
          placeholder="Confirmez votre mot de passe"
          required={true}
          defaultValue={state.formData?.get("confirm-password") as string}
          error={
            confirmPasswordError?.includes("correspondent")
              ? confirmPasswordError
              : ""
          }
        />

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="confirm-terms"
              name="confirm-terms"
              type="checkbox"
              required
              className="h-4 w-4"
            />
            <label htmlFor="confirm-terms" className="ml-2 block text-xs">
              J&apos;accepte les{" "}
              <Link
                href="/conditions-generales-de-vente"
                className="font-medium underline text-midnight-green hover:text-midnight-green/80"
              >
                conditions d&apos;utilisation
              </Link>{" "}
              et la{" "}
              <Link
                href="/mentions-legales"
                className="font-medium underline text-midnight-green hover:text-midnight-green/80"
              >
                politique de confidentialité
              </Link>
            </label>
          </div>
          {confirmTermsError && (
            <i className="block text-red-500 text-xs">{confirmTermsError}</i>
          )}
        </div>

        <div className="flex items-start">
          <input
            id="newsletter"
            name="newsletter"
            type="checkbox"
            className="h-4 w-4"
          />
          <label htmlFor="newsletter" className="ml-2 text-xs">
            Je souhaite recevoir la newsletter EurasiaPeace et les informations
            sur les événements
          </label>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          onClick={handleSubmitSignUp}
          className="w-full font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          Créer mon compte
        </Button>
      </Form>

      {/* Success */}
      {state?.success && (
        <div className="bg-green-100 p-2 rounded-lg my-4">
          <i className="text-green-800 text-sm">
            Votre compte a été créé avec succès. <br /> Vérifiez votre email
            pour activer votre compte.
          </i>
        </div>
      )}

      {/* Newsletter Error */}
      {hasNewsletterError && <ErrorMessage>{hasNewsletterError}</ErrorMessage>}

      {/* Server Error */}
      {hasServerError && (
        <ErrorMessage>
          Une erreur est survenue de notre côté. Veuillez réessayer.
        </ErrorMessage>
      )}

      {!isCaptchaValid && reCaptchaMessage && (
        <ErrorMessage>{reCaptchaMessage}</ErrorMessage>
      )}

      {/* Footer */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background-secondary">
              Vous avez déjà un compte ?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={`${
              redirect ? "/connexion?redirect_url=" + redirect : "/connexion"
            }`}
            className="group flex justify-center items-center gap-2"
          >
            <LogIn size={16} className="text-midnight-green" />
            <p className="text-midnight-green font-semibold hover:underline">
              Se connecter
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs">
          Vous recevrez un email de confirmation après votre inscription.
        </p>
      </div>
    </div>
  );
}
