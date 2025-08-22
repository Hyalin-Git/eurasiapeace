"use client";

import LinkButton from "@/ui/LinkButton";
import { AlertCircle, Check } from "lucide-react";

export default function ForgotPasswordSuccessStep() {
  return (
    <div>
      {/* Icône de succès */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
      </div>

      {/* Titre principal */}
      <h2 className="font-bold text-text-primary text-center mb-4">
        Mot de passe réinitialisé !
      </h2>

      {/* Message de confirmation */}
      <div className="text-center mb-6 space-y-2">
        <p className="text-text-secondary leading-relaxed">
          Votre mot de passe a été réinitialisé avec succès.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
      </div>

      {/* Message de sécurité */}
      <div className="bg-background-third p-4 rounded-lg mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="min-w-5 min-h-5 text-text-third" />
          <div>
            <p className="text-sm text-text-third font-medium mb-1">
              Conseil de sécurité
            </p>
            <p className="text-sm text-text-secondary">
              Assurez-vous de garder votre nouveau mot de passe en sécurité et
              de ne le partager avec personne.
            </p>
          </div>
        </div>
      </div>

      {/* Bouton de connexion */}
      <LinkButton
        href="/connexion"
        label="Se connecter"
        className="w-full text-center bg-midnight-green font-semibold hover:bg-midnight-green/90"
      />

      {/* Lien secondaire */}
      <div className="text-center mt-4">
        <LinkButton
          href="/"
          label="Retour à l'accueil"
          className="w-full text-center font-semibold bg-gray-300 hover:bg-gray-400/60!"
        />
      </div>
    </div>
  );
}
