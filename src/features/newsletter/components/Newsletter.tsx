"use client";

import GoogleReCaptchaProvider from "@/context/GoogleReCaptchaProvider";
import { subscribeToNewsletter } from "@/features/newsletter/server/actions/newsletter";
import ErrorMessage from "@/ui/ErrorMessage";
import SuccessMessage from "@/ui/SuccessMessage";
import { ArrowRight, Check, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import Form from "../../../components/form/Form";
import Button from "../../../ui/Button";
import { InitialState } from "../types";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  errors: null,
};

export default function Newsletter({
  width = "max-w-6xl",
}: {
  width?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  const hasServerError = state?.status === 500;
  const isSuccess = state?.success && state?.status === 200;

  // Reset du formulaire après succès
  useEffect(() => {
    if (isSuccess && formRef.current) {
      formRef.current.reset();
    }
  }, [isSuccess]);

  return (
    <GoogleReCaptchaProvider>
      <div
        className={`flex flex-col lg:flex-row rounded-xl overflow-hidden drop-shadow-2xl text-white ${width} mx-auto`}
      >
        <div className="bg-headband p-4 sm:p-10 flex-1/2">
          <div className="bg-gray-200/10 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
            <Mail size={24} />
          </div>

          <span className="text-gray-200 font-semibold">Restez informé !</span>

          <p className="text-gray-100 text-sm md:text-base mt-4">
            Recevez nos articles de veille géopolitique deux fois par mois et
            restez en connexion avec l'actualité internationale.
          </p>

          <ul className="mt-4 sm:mt-8 [&>li]:flex [&>li]:gap-2 [&>li]:text-gray-200/90 [&>li]:text-sm [&>li:not(:last-child)]:mb-4">
            <li>
              <Check size={18} /> Analyses mensuelles thématiques exclusives
            </li>
            <li>
              <Check size={18} /> Décryptage des enjeux mondiaux
            </li>
            <li>
              <Check size={18} /> Désabonnement facile à tout moment
            </li>
          </ul>
        </div>

        <div className="p-4 sm:p-10 lg:py-14 flex-1/2 bg-background-secondary">
          <span className="block mb-2 font-medium">Newsletter</span>

          <p className="text-gray-500 font-medium text-sm mb-4 sm:mb-6">
            Cultivez-vous et montez en compétences ! <br /> Recevez en
            exclusivité nos dernières parutions et nos offres de formation.
          </p>

          <Form formRef={formRef} action={formAction}>
            <label htmlFor="email" className="text-gray-600 text-sm mb-2 block">
              Adresse email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre adresse email"
              required
              className="col-span-2 mb-4 w-full text-sm text-text-primary placeholder-gray-400 border-1 border-gray-200 bg-white rounded-md px-2 py-3 outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-background-light-blue! hover:bg-background-dark-blue!"
            >
              S&apos;abonner à la newsletter <ArrowRight size={18} />
            </Button>

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
                Une erreur est survenue lors de l&apos;inscription à la
                newsletter
              </ErrorMessage>
            )}
          </Form>

          <p className="text-xs text-center text-gray-500/80 mt-3">
            En vous inscrivant, vous acceptez de recevoir nos emails. <br />
            <Link
              href="/newsletter/unsubscribe"
              className="underline mt-1 block"
            >
              Désabonnement en un clic
            </Link>
          </p>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
