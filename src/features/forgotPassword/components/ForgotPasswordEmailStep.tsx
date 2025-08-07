"use client";

import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import { useActionState, useEffect } from "react";
import { sendPasswordResetCode } from "../server/actions/forgotPassword";
import Button from "@/ui/Button";
import { Send } from "lucide-react";
import ErrorMessage from "@/ui/ErrorMessage";
import { InitialState } from "../types";

const initialState: InitialState = {
  success: false,
  status: 0,
  message: "",
  formData: null,
  errors: null,
};

export default function ForgotPasswordEmailStep({
  setUserEmail,
  setStep,
}: {
  setUserEmail: (email: string) => void;
  setStep: (step: number) => void;
}) {
  const [state, formAction, isPending] = useActionState(
    sendPasswordResetCode,
    initialState
  );
  const hasServerError = state?.status === 500;
  const notFoundErr = state?.status === 404;

  useEffect(() => {
    if (state?.success) {
      setUserEmail(state.formData?.get("email") as string);
      setStep(2);
    }
  }, [state, setStep, setUserEmail]);

  return (
    <Form action={formAction}>
      <FormFields
        label="Adresse e-mail"
        id="email"
        type="email"
        placeholder="email@exemple.com"
        required={true}
        defaultValue={state.formData?.get("email") as string}
        error={state.errors?.email?.[0]}
      />

      {notFoundErr && (
        <ErrorMessage>
          Cette adresse e-mail n&apos;est pas associée à un compte.
          <br />
          Veuillez vérifier votre saisie ou vous inscrire si vous n&apos;avez
          pas de compte.
        </ErrorMessage>
      )}

      {hasServerError && (
        <ErrorMessage>
          Une erreur est survenue lors de l&apos;envoi du lien de
          réinitialisation. <br /> Veuillez réessayer plus tard.
        </ErrorMessage>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full font-semibold hover:bg-blue-600 transition-colors duration-300"
      >
        <Send size={18} /> Envoyer le lien de réinitialisation
      </Button>
    </Form>
  );
}
