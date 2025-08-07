"use client";

import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import Button from "@/ui/Button";
import { ShieldCheck } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { verifyPasswordResetCode } from "../server/actions/forgotPassword";
import { InitialState } from "../types";
import SuccessMessage from "@/ui/SuccessMessage";
import ErrorMessage from "@/ui/ErrorMessage";
import { randomBytes } from "crypto";
import { savePasswordResetCode } from "../server/db/forgotPassword";
import { sendEmailPasswordReset } from "../utils/forgotPasswordMail";
import { Error } from "@/types";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function ForgotPasswordCodeStep({
  userEmail,
  setStep,
}: {
  userEmail: string;
  setStep: (step: number) => void;
}) {
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(60);
  const [resendError, setResendError] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(
    verifyPasswordResetCode,
    initialState
  );

  const hasServerError = state?.status === 500;
  const hasNotFound = state?.status === 404;
  const hasExpired = state?.status === 410;

  async function sendVerificationCode() {
    try {
      if (cooldown) return; // Prevent sending if cooldown is active

      setResendError(false);

      const code = randomBytes(2).toString("hex").toUpperCase();

      await savePasswordResetCode(userEmail, code);

      await sendEmailPasswordReset(userEmail, code);

      setCooldownTime(60); // Reset cooldown time to 60 seconds
      setCooldown(true);
    } catch (e: unknown) {
      const err = e as Error;
      console.error(err);

      setResendError(true);
    }
  }

  // Handle cooldown timer
  useEffect(() => {
    if (cooldown) {
      const timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCooldown(false);
            return 60; // Reset cooldown time
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (state?.success) {
      setStep(3); // Move to the next step if the code is verified successfully
    }
  }, [state?.success, setStep]);

  return (
    <div>
      <Form action={formAction}>
        <FormFields
          label="Code de vérification"
          id="code"
          type="text"
          placeholder="Code"
          required={true}
          defaultValue={state.formData?.get("code") as string}
          error={state.errors?.code?.[0]}
        />

        {/* ERRORS MESSAGES */}
        {hasNotFound && (
          <ErrorMessage>
            Le code de vérification est invalide.
            <br />
            Veuillez vérifier le code et réessayer.
          </ErrorMessage>
        )}

        {hasExpired && (
          <ErrorMessage>
            Le code de vérification a expiré.
            <br />
            Veuillez demander un nouveau code.
          </ErrorMessage>
        )}

        {resendError && (
          <ErrorMessage>
            Une erreur est survenue lors de l&apos;envoi du code de
            vérification.
            <br />
            Veuillez réessayer plus tard.
          </ErrorMessage>
        )}

        {hasServerError && (
          <ErrorMessage>
            Une erreur est survenue lors de la vérification du code.
            <br />
            Veuillez réessayer plus tard.
          </ErrorMessage>
        )}
        {/* ERRORS MESSAGES */}

        <div>
          {!hasServerError && !hasNotFound && !hasExpired && !resendError && (
            <SuccessMessage>
              Un code de vérification a été envoyé à votre adresse e-mail.
              <br />
              Veuillez le saisir ci-dessus pour continuer.
            </SuccessMessage>
          )}
          <div className="text-center " onClick={sendVerificationCode}>
            <span className="text-sm text-midnight-green cursor-pointer">
              {cooldown
                ? `${cooldownTime}s avant de renvoyer un code`
                : "Renvoyer un code de vérification"}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          <ShieldCheck size={18} /> Verifier le code
        </Button>
      </Form>
    </div>
  );
}
