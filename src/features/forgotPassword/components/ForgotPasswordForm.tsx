"use client";

import { useState } from "react";
import ForgotPasswordSteps from "./ForgotPasswordSteps";
import { LogIn } from "lucide-react";
import Link from "next/link";
import ForgotPasswordEmailStep from "./ForgotPasswordEmailStep";
import ForgotPasswordCodeStep from "./ForgotPasswordCodeStep";
import ForgotPasswordResetStep from "./ForgotPasswordResetStep";
import ForgotPasswordSuccessStep from "./ForgotPasswordSuccessStep";

export default function ForgotPasswordForm() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [step, setStep] = useState(1);

  return (
    <div className="mt-8 shadow rounded-lg p-8 bg-background-secondary border border-gray-200 w-full max-w-130">
      {step <= 3 && <ForgotPasswordSteps step={step} />}

      {step === 1 && (
        <ForgotPasswordEmailStep
          setUserEmail={setUserEmail}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <ForgotPasswordCodeStep userEmail={userEmail} setStep={setStep} />
      )}

      {step === 3 && (
        <ForgotPasswordResetStep userEmail={userEmail} setStep={setStep} />
      )}

      {step === 4 && <ForgotPasswordSuccessStep />}

      {step < 4 && (
        <div className="mt-6 space-y-6 text-center">
          <div className="before:content-[''] before:-z-10 before:absolute before:inset-0 before:top-[50%] before:bg-gray-300 before:h-px before:w-full relative z-10">
            <span className="bg-background-secondary w-fit px-2 text-sm">
              Votre mot de passe vous revient ?
            </span>
          </div>

          <div>
            <Link
              href={`/connexion`}
              className="group flex justify-center items-center gap-2 text-midnight-green font-semibold hover:underline"
            >
              <LogIn size={16} className="" />
              Se connecter
            </Link>
          </div>

          <p className="text-xs">
            Vous allez recevoir un e-mail avec un lien de réinitialisation.
          </p>
        </div>
      )}
    </div>
  );
}
