import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import Modal from "@/components/Modal";
import Portal from "@/components/Portal";
import Button from "@/ui/Button";
import { InitialState, User } from "../types";
import { useActionState } from "react";
import { createUserEmailUpdate } from "../server/actions.ts/user";
import SuccessMessage from "@/ui/SuccessMessage";
import ErrorMessage from "@/ui/ErrorMessage";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function UserUpdateEmail({
  user,
  setIsEditingEmail,
}: {
  user: User;
  setIsEditingEmail: (isEditing: boolean) => void;
}) {
  const [state, formAction, pending] = useActionState(
    createUserEmailUpdate,
    initialState
  );

  const isSuccess = state?.success && state?.status === 200;
  const isServerError = !state?.success && state?.status === 500;

  return (
    <Portal>
      <Modal title="Modifier mon adresse e-mail" setIsOpen={setIsEditingEmail}>
        <div className="mb-6 -mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm">
          <span className="font-semibold text-text-third block mb-1">
            Information importante
          </span>
          Veuillez renseigner votre nouvelle adresse e-mail ainsi que votre mot
          de passe actuel.
          <br />
          <br />
          Une fois la modification effectuée, vous recevrez un e-mail de
          confirmation à la nouvelle adresse.
          <br />
          <span className="text-xs text-blue-600 pt-2 block">
            Pensez à vérifier vos spams si vous ne le recevez pas immédiatement.
          </span>
        </div>

        <Form action={formAction}>
          <input
            type="email"
            name="current-email"
            id="current-email"
            defaultValue={user.email}
            required
            hidden
          />

          <input
            type="text"
            name="first-name"
            id="first-name"
            defaultValue={user.firstName}
            required
            hidden
          />

          <FormFields
            type="email"
            id="email"
            label="Nouvelle adresse e-mail"
            placeholder="exemple@domaine.com"
            required
            className="border rounded-md px-2 mt-1"
            defaultValue={state?.formData?.get("email") as string}
            error={state.errors?.email?.[0]}
          />

          <FormFields
            type="password"
            id="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            required
            className="border rounded-md px-2 mt-1"
            defaultValue={state?.formData?.get("password") as string}
            error={state.errors?.password?.[0]}
          />

          {isSuccess && (
            <SuccessMessage>
              Un e-mail de confirmation a été envoyé à votre nouvelle adresse
              e-mail. <br /> Merci de vérifier votre boîte de réception.
            </SuccessMessage>
          )}

          {isServerError && (
            <ErrorMessage>
              Une erreur est survenue lors de la mise à jour de votre adresse
              e-mail. <br /> Veuillez réessayer plus tard.
            </ErrorMessage>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            Modifier mon adresse e-mail
          </Button>
        </Form>
      </Modal>
    </Portal>
  );
}
