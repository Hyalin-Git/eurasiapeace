import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import Button from "@/ui/Button";
import { Key } from "lucide-react";
import { InitialState } from "../types";
import { resetPassword } from "../server/actions/forgotPassword";
import { useActionState, useEffect } from "react";
import ErrorMessage from "@/ui/ErrorMessage";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function ForgotPasswordResetStep({
  userEmail,
  setStep,
}: {
  userEmail: string;
  setStep: (step: number) => void;
}) {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState
  );

  const notFoundErr = state?.status === 404;
  const serverError = state?.status === 500;

  useEffect(() => {
    if (state?.success) {
      setStep(4);
    }
  }, [state?.success, setStep]);

  return (
    <Form action={formAction}>
      <input
        type="text"
        id="email"
        name="email"
        defaultValue={userEmail}
        hidden
      />

      <FormFields
        label="Mot de passe"
        id="password"
        type="password"
        placeholder="Nouveau mot de passe"
        required={true}
        defaultValue={state.formData?.get("password") as string}
        error={state.errors?.password?.[0] || ""}
      />

      <FormFields
        label="Confirmation du mot de passe"
        id="confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
        required={true}
        defaultValue={state.formData?.get("confirmPassword") as string}
        error={state.errors?.confirmPassword?.[0] || ""}
      />

      {notFoundErr && (
        <ErrorMessage>
          Aucune demande de réinitialisation de mot de passe trouvée pour
          l&apos;adresse e-mail renseignée.
        </ErrorMessage>
      )}

      {serverError && (
        <ErrorMessage>
          Une erreur est survenue lors de la réinitialisation du mot de passe.
          <br />
          Veuillez réessayer plus tard.
        </ErrorMessage>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full font-semibold hover:bg-blue-600 transition-colors duration-300"
      >
        <Key size={18} /> Réinitialiser le mot de passe
      </Button>
    </Form>
  );
}
