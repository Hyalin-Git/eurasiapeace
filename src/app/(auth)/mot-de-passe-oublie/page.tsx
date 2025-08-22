"use server";

import ForgotPasswordForm from "@/features/forgotPassword/components/ForgotPasswordForm";

export default async function ForgotPassword() {
  return (
    <div className="container h-full flex flex-col justify-center items-center py-15">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-extrabold">Mot de passe oublié</h2>
        <p className="mt-2 text-center text-sm">
          Entrez votre adresse e-mail pour recevoir un lien de réinitialisation
          de mot de passe.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
