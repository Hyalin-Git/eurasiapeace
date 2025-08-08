"use client";

import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import Button from "@/ui/Button";
import { CircleAlert, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InitialState } from "../types";
import { useActionState, useEffect } from "react";
import { signIn } from "../server/actions/signIn";
import { mutate } from "swr";
import { resendVerificationEmail } from "../server/api/signIn";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function SignInForm({ redirect }: { redirect?: string }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const hasError = state?.errors?.email || state?.errors?.password;
  const hasServerError = state?.status === 500;
  const unVerfiedEmail = state?.status === 403;

  useEffect(() => {
    async function handleAuthAndRedirect() {
      await mutate("/api/auth/verify-token");

      return router.push(redirect || "/");
    }

    if (state?.success) {
      handleAuthAndRedirect();
    }
  }, [state?.success, router, redirect]);

  async function handleResendVerification() {
    if (unVerfiedEmail) {
      await resendVerificationEmail(state.formData?.get("email") as string);
    }
  }

  return (
    <div className="mt-8 shadow rounded-lg p-8 bg-background-secondary border border-gray-200 w-full max-w-130">
      <Form action={formAction}>
        <FormFields
          label="Adresse e-mail"
          id="email"
          type="email"
          placeholder="email@exemple.com"
          required={true}
          defaultValue={state.formData?.get("email") as string}
          error={""}
        />

        <FormFields
          label="Mot de passe"
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          required={true}
          defaultValue={state.formData?.get("password") as string}
          error={""}
        />

        <div className="text-right mt-[-14px] text-sm">
          <Link
            href="/mot-de-passe-oublie"
            className="font-medium text-midnight-green hover:text-midnight-green/80 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          <LogIn size={16} />
          Se connecter
        </Button>
      </Form>

      {/* Error */}
      {hasError && (
        <>
          <div className="bg-red-100 p-2 rounded-md my-4">
            <i className="flex items-center justify-center gap-2 text-red-500 text-sm">
              <CircleAlert size={16} />{" "}
              {state.errors?.email || state.errors?.password}
            </i>
          </div>
          {unVerfiedEmail && (
            <div
              className="text-center text-sm text-midnight-green cursor-pointer"
              onClick={handleResendVerification}
            >
              Renvoyer un e-mail de vérification
            </div>
          )}
        </>
      )}

      {/* Server Error */}
      {hasServerError && (
        <div className="bg-red-100 p-2 rounded-md my-4">
          <i className="flex items-center justify-center gap-2 text-red-500 text-sm">
            <CircleAlert size={16} /> Une erreur est survenue de notre côté.
            Veuillez réessayer.
          </i>
        </div>
      )}

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background-secondary">
              Pas encore de compte ?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={`${
              redirect
                ? "/inscription?redirect_url=" + redirect
                : "/inscription"
            }`}
            className="group flex justify-center items-center gap-2"
          >
            <UserPlus size={16} className="text-midnight-green" />
            <p className="text-midnight-green font-semibold hover:underline">
              Créer un compte
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs">
          En vous connectant, vous acceptez nos{" "}
          <Link
            href="/conditions-generales-de-vente"
            className="font-medium text-midnight-green underline hover:text-midnight-green/80"
          >
            conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link
            href="/mentions-legales"
            className="font-medium text-midnight-green underline hover:text-midnight-green/80"
          >
            politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  );
}
