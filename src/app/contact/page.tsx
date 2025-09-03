"use client";
import { sendContact } from "@/features/contact/server/actions/contact";
import Banner from "@/components/banners/Banner";
import Form from "@/components/form/Form";
import FormFields from "@/components/form/FormFields";
import TextareaField from "@/components/form/TextareaField";
import RGPDInputLabel from "@/components/form/RGPDInputLabel";
import SocialMedia from "@/ui/SocialMedia";
import Button from "@/ui/Button";
import { Mail, Phone, Send } from "lucide-react";
import { useActionState, useRef, useState } from "react";
import { verifyRecaptcha } from "@/server/api/recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ErrorMessage from "@/ui/ErrorMessage";
import { InitialState } from "@/features/contact/types";

const initialState: InitialState = {
  success: false,
  status: null,
  message: "",
  formData: null,
  errors: null,
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [reCaptchaMessage, setReCaptchaMessage] = useState<string>("");
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction, isPending] = useActionState(
    sendContact,
    initialState
  );

  const errors = state?.errors;
  const hasServerError = state?.status === 500;

  async function handleSubmitSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      e.preventDefault();
      setIsCaptchaValid(false);

      if (!executeRecaptcha) {
        setReCaptchaMessage(
          "Nous n'avons pas pu vérifier que vous êtes humain"
        );
        throw new Error("reCAPTCHA not yet available");
      }

      const getRecaptchaToken = await executeRecaptcha("signUp");

      if (!getRecaptchaToken) {
        setReCaptchaMessage(
          "Nous n'avons pas pu vérifier que vous êtes humain"
        );
        throw new Error("reCAPTCHA not yet available");
      }

      const { success, data } = await verifyRecaptcha(
        getRecaptchaToken as string
      );

      if (!success) {
        setReCaptchaMessage(
          "Nous n'avons pas pu vérifier que vous êtes humain"
        );
        throw new Error("Captcha invalide, score: " + data?.score);
      }

      setIsCaptchaValid(true);

      formRef?.current?.requestSubmit();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const BannerProps = {
    title: "Contact",
    src: "/headband-contact.png",
  };

  return (
    <div>
      <Banner BannerProps={BannerProps} />
      <div className="container flex flex-col lg:flex-row gap-20 lg:gap-2 justify-between py-20">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="font-semibold">Contactez-nous</h2>
          <p>
            Chez EurasiaPeace, nous croyons au dialogue, à la coopération et à
            l&apos;échange. Que vous soyez un lecteur, un partenaire potentiel,
            un chercheur, un étudiant ou un professionnel engagé, nous serions
            ravis d&apos;échanger avec vous.
          </p>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
            <div className="flex items-center gap-2">
              <Mail size={24} className="text-midnight-green" />
              <a
                href="contact@eurasiapeace.org"
                className="text-midnight-green font-semibold"
              >
                contact@eurasiapeace.org
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={24} className="text-midnight-green" />
              <a
                href="tel:+330637363699"
                className="text-midnight-green font-semibold"
              >
                +33 (0)6 37 36 36 99
              </a>
            </div>
          </div>
          <SocialMedia className="mt-4" />
        </div>
        <div>
          <Form formRef={formRef} action={formAction}>
            <div className="flex items-center gap-8">
              <FormFields
                label={"Prénom"}
                id="firstName"
                type="text"
                placeholder="Votre prénom"
                required={true}
                defaultValue={
                  state?.formData?.get("firstName")?.toString() || ""
                }
                error={errors?.firstName?.[0]}
              />

              <FormFields
                label={"Nom"}
                id="lastName"
                type="text"
                placeholder="Votre nom"
                required={true}
                defaultValue={
                  state?.formData?.get("lastName")?.toString() || ""
                }
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

            <FormFields
              label={"Objet"}
              id="subject"
              type="text"
              placeholder="Sujet de votre message"
              required={true}
              defaultValue={state?.formData?.get("subject")?.toString() || ""}
              error={errors?.subject?.[0]}
            />

            <TextareaField
              label={"Message"}
              id="message"
              placeholder="Votre message"
              defaultValue={state?.formData?.get("message")?.toString() || ""}
              error={errors?.message?.[0]}
            />

            <RGPDInputLabel error={errors?.rgpd?.[0]} />

            {/* Server Error */}
            {hasServerError && (
              <ErrorMessage>
                Une erreur est survenue de notre côté. Veuillez réessayer.
              </ErrorMessage>
            )}

            {/* ReCAPTCHA Error */}
            {!isCaptchaValid && reCaptchaMessage && (
              <ErrorMessage>{reCaptchaMessage}</ErrorMessage>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              onClick={handleSubmitSignUp}
            >
              <Send size={16} />
              Envoyer le message
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
