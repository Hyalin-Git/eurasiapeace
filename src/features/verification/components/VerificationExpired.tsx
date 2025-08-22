import LinkButton from "@/ui/LinkButton";
import { Clock } from "lucide-react";

export default function VerificationExpired() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
        <Clock className="w-8 h-8 text-orange-600" />
      </div>
      <h1 className="font-bold text-text-primary mb-2">
        Lien de vérification expiré
      </h1>
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <p className="text-orange-700 text-sm">
          Le lien de vérification que vous avez utilisé a expiré. Pour des
          raisons de sécurité, les liens de vérification sont valides pendant 30
          minutes seulement.
        </p>
      </div>
      <div className="space-y-4">
        <LinkButton
          href="/inscription"
          label="Demander un nouveau lien"
          className="w-full"
        />
        <LinkButton
          href="/contact"
          label="Besoin d'aide ?"
          className="w-full bg-gray-300 text-text-primary hover:bg-gray-400/60"
        />
        <LinkButton
          href="/"
          label="Retour à l'accueil"
          className="w-full bg-gray-300 text-text-primary hover:bg-gray-400/60"
        />
      </div>
    </div>
  );
}
