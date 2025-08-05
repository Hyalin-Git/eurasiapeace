"use client";
import { MailOpen } from "lucide-react";
import React, { useActionState, useRef } from "react";
import Button from "../../../ui/Button";
import GoogleReCaptchaProvider from "@/context/GoogleReCaptchaProvider";
import Form from "../../../components/form/Form";
import { subscribeToNewsletter } from "@/features/newsletter/server/actions/newsletter";
import ErrorMessage from "@/ui/ErrorMessage";
import SuccessMessage from "@/ui/SuccessMessage";
import { InitialState } from "../types";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  errors: null,
};

export default function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  const hasServerError = state?.status === 500;
  const isSuccess = state?.success && state?.status === 200;

  return (
    <GoogleReCaptchaProvider>
      <div className="bg-headband rounded-lg shadow-lg p-6 text-white">
        <div className="text-center">
          <div className="flex justify-center gap-2">
            <MailOpen size={24} />
            <h3 className="font-semibold text-lg mb-2 text-white">
              Newsletter
            </h3>
          </div>
          <p className="text-gray-200 text-sm mb-4">
            {/* {Texte dynamique} */}
            Recevez nos analyses géopolitiques directement dans votre boîte mail
          </p>
        </div>
        <Form formRef={formRef} action={formAction}>
          <div className="flex items-start gap-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre adresse email"
              required
              className="col-span-2 w-full text-sm text-text-primary placeholder-gray-400 border-2 border-white bg-white rounded-md p-2 outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
            <Button
              type="submit"
              disabled={isPending}
              className="bg-white text-text-primary! hover:bg-white/80!"
            >
              S&apos;abonner
            </Button>
          </div>

          {/* Success message */}
          {isSuccess && (
            <SuccessMessage>
              Vous êtes maintenant abonné à notre newsletter !
            </SuccessMessage>
          )}

          {/* Error related to email adress */}
          {state?.errors && (
            <ErrorMessage>{state?.errors?.email?.[0]}</ErrorMessage>
          )}

          {/* Server error message */}
          {hasServerError && (
            <ErrorMessage>
              Une erreur est survenue lors de l&apos;inscription à la newsletter
            </ErrorMessage>
          )}
        </Form>
        <p className="text-xs text-center text-gray-200 mt-3">
          Pas de spam, désabonnement en un clic
        </p>
      </div>
    </GoogleReCaptchaProvider>
  );
}
