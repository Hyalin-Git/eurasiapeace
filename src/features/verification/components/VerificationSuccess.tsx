import LinkButton from "@/ui/LinkButton";
import { Check } from "lucide-react";

export default function VerificationSuccess() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-bold text-text-primary mb-2">
          Email vérifié avec succès !
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 text-sm">
            Votre adresse email a été confirmée. Vous pouvez maintenant accéder
            à votre compte et profiter de tous nos services.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <LinkButton href="/connexion" label="Se connecter" className="w-full" />

        <LinkButton
          href="/"
          label="Retour à l'accueil"
          className="w-full bg-gray-300 text-text-primary hover:bg-gray-400/60"
        />
      </div>
    </div>
  );
}
