import LinkButton from "@/ui/LinkButton";
import { X } from "lucide-react";

export default function VerificationFailed() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <X className="w-8 h-8 text-red-600" />
      </div>
      <h1 className="font-bold text-text-primary mb-2">
        Lien de vérification introuvable
      </h1>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-700 text-sm">
          Le lien de vérification que vous avez utilisé n&apos;existe pas ou a
          déjà été utilisé. Veuillez demander un nouveau lien de vérification.
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
