"use client";

import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import Section from "@/components/Section";
import Button from "@/ui/Button";
import { Shield } from "lucide-react";
import { InitialState, User } from "../types";
import { useActionState, useEffect, useState } from "react";
import { updateUserPassword } from "../server/actions.ts/user";
import Toast from "@/components/Toast";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function UserUpdatePassword({ user }: { user: User }) {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [state, formAction, pending] = useActionState(
    updateUserPassword,
    initialState
  );

  const isSuccess = state?.success && state?.status === 200;
  const servError = !state?.success && state?.status === 500;

  const successMsg = "Votre mot de passe a été mis à jour avec succès.";
  const errorMsg =
    "Une erreur s'est produite lors de la mise à jour de votre mot de passe.";

  useEffect(() => {
    if (isSuccess || servError) {
      setShowToast(true);
    }
  }, [isSuccess, servError, state]);

  return (
    <Section
      icon={<Shield className="text-btn-force-blue" size={32} />}
      title="Sécurité"
      description="Modifiez votre mot de passe."
      className="pt-0!"
    >
      <Form action={formAction}>
        <input
          type="text"
          id="uid"
          name="uid"
          required={true}
          defaultValue={user?.databaseId}
          hidden
        />
        <input
          type="email"
          id="email"
          name="email"
          required={true}
          defaultValue={user?.email}
          hidden
        />

        <div className="flex flex-col md:flex-row gap-10">
          <FormFields
            id="current-password"
            label="Mot de passe actuel"
            type="password"
            placeholder="••••••••"
            required={true}
            className="border px-2 rounded-sm mt-1"
            error={state?.errors?.currentPassword?.[0]}
          />
          <FormFields
            id="new-password"
            label="Nouveau mot de passe"
            type="password"
            placeholder="••••••••"
            required={true}
            className="border px-2 rounded-sm mt-1"
            error={state?.errors?.newPassword?.[0]}
          />
          <FormFields
            id="confirm-password"
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            required={true}
            className="border px-2 rounded-sm mt-1"
            error={state?.errors?.confirmPassword?.[0]}
          />
        </div>

        <Button type="submit" disabled={pending} className="mt-5 ml-auto">
          Enregistrer
        </Button>
      </Form>

      {(isSuccess || servError) && (
        <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          success={state?.success}
          message={isSuccess ? successMsg : errorMsg}
        />
      )}
    </Section>
  );
}
