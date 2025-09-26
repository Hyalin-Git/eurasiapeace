"use client";

import { InitialState, User } from "../types";
import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import { useActionState, useEffect } from "react";
import { updateUser } from "../server/actions.ts/user";
import Button from "@/ui/Button";
import TextareaField from "@/components/form/TextareaField";
import { useSubscription } from "@/context/SubscriptionContext";
import { useUserRole } from "@/context/UserRoleContext";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function UserInfoEdit({
  user,
  setIsEdit,
  mutate,
}: {
  user: User;
  setIsEdit: (isEdit: boolean) => void;
  mutate: () => void;
}) {
  const { hasContributorSubscription } = useSubscription();
  const { userRole } = useUserRole();
  const [state, formAction, pending] = useActionState(updateUser, initialState);

  const isFormateur = userRole.includes("formateur");
  const isContributeur = userRole.includes("contributor");

  const showBioField =
    hasContributorSubscription || isFormateur || isContributeur;

  useEffect(() => {
    if (state?.success) {
      mutate();
      setIsEdit(false);
    }
  }, [state, mutate, setIsEdit]);

  return (
    <Form action={formAction}>
      <div className="flex flex-col gap-4 md:flex-row w-full mt-0 md:mt-6">
        <div className="w-full">
          <input
            type="text"
            id="uid"
            name="uid"
            defaultValue={user?.databaseId}
            required
            hidden
          />

          <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-10">
            <FormFields
              id="last-name"
              type="text"
              label="Nom"
              placeholder="Entrez votre nom"
              defaultValue={user?.lastName}
              required={true}
              className="border rounded-sm px-2 mt-1"
            />

            <FormFields
              id="first-name"
              type="text"
              label="Prénom"
              placeholder="Entrez votre prénom"
              defaultValue={user?.firstName}
              required={true}
              className="border rounded-sm px-2 mt-1"
            />
          </div>

          {showBioField && (
            <div className="mt-4">
              <TextareaField
                id="description"
                label="Biographie"
                placeholder="Entrez votre biographie"
                defaultValue={user?.description || ""}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6 md:mt-8 md:w-full">
        <Button
          type="button"
          onClick={() => setIsEdit(false)}
          className="w-full md:w-fit"
        >
          Annuler
        </Button>
        <Button type="submit" className="w-full md:w-fit" disabled={pending}>
          Enregistrer
        </Button>
      </div>
    </Form>
  );
}
