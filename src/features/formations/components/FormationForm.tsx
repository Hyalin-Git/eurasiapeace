"use client";

import Form from "@/components/form/Form";
import { InitialState } from "../types";
import { useActionState } from "react";
import { registerToFormation } from "../server/actions/formations";
import TextareaField from "@/components/form/TextareaField";
import FormFields from "@/components/form/FormFields";
import Button from "@/ui/Button";
import { Send } from "lucide-react";
import RGPDInputLabel from "@/components/form/RGPDInputLabel";
import SuccessMessage from "@/ui/SuccessMessage";
import ErrorMessage from "@/ui/ErrorMessage";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function FormationForm({ title }: { title: string }) {
  const registerToFormationWithTitle = registerToFormation.bind(null, title);
  const [state, formAction, isPending] = useActionState(
    registerToFormationWithTitle,
    initialState
  );

  const success = state?.success && state?.status === 200;
  const servError = !state?.success && state?.status === 500;
  const errors = state?.errors;

  return (
    <Form action={formAction}>
      <div className="flex items-center gap-8">
        <FormFields
          label={"Prénom"}
          id="firstName"
          type="text"
          placeholder="Votre prénom"
          required={true}
          defaultValue={state?.formData?.get("firstName")?.toString() || ""}
          error={errors?.firstName?.[0]}
        />

        <FormFields
          label={"Nom"}
          id="lastName"
          type="text"
          placeholder="Votre nom"
          required={true}
          defaultValue={state?.formData?.get("lastName")?.toString() || ""}
          error={errors?.lastName?.[0]}
        />
      </div>

      <div className="flex items-center gap-8">
        <FormFields
          label={"Email"}
          id="email"
          type="email"
          placeholder="email@exemple.com"
          required={true}
          defaultValue={state?.formData?.get("email")?.toString() || ""}
          error={errors?.email?.[0]}
        />

        <FormFields
          label={"Numéro de téléphone"}
          id="phone"
          type="tel"
          placeholder="Votre numéro"
          required={true}
          defaultValue={state?.formData?.get("phone")?.toString() || ""}
          error={errors?.phone?.[0]}
        />
      </div>

      <TextareaField
        label={"Message"}
        id="message"
        placeholder="Votre message"
        defaultValue={state?.formData?.get("message")?.toString() || ""}
        error={errors?.message?.[0]}
      />

      <RGPDInputLabel error={errors?.rgpd?.[0]} />

      {success && (
        <SuccessMessage>
          Nous avons bien reçu votre inscription à la formation. <br /> Notre
          équipe va examiner votre demande et vous recontactera dans les plus
          brefs délais.
        </SuccessMessage>
      )}

      {servError && (
        <ErrorMessage>
          Une erreur est survenue lors de l&apos;inscription à la formation.
          <br />
          Veuillez réessayer plus tard.
        </ErrorMessage>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        <Send size={16} />
        Envoyer le message
      </Button>
    </Form>
  );
}
