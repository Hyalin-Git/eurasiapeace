"use server";

import { AlertCircle } from "lucide-react";
import { verifyUserEmail } from "@/features/verification/server/db/verification";
import VerificationSuccess from "@/features/verification/components/VerificationSuccess";
import VerificationFailed from "@/features/verification/components/VerificationFailed";
import VerificationExpired from "@/features/verification/components/VerificationExpired";
import LinkButton from "@/ui/LinkButton";

export default async function Verification({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { success, status } = await verifyUserEmail(id);

  const renderVerificationContent = () => {
    if (success && status === 200) {
      return <VerificationSuccess />;
    }

    if (!success && status === 404) {
      return <VerificationFailed />;
    }

    if (!success && status === 410) {
      return <VerificationExpired />;
    }

    // By default, handle unexpected errors
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Erreur de vérification
          </h1>
          <p className="text-text-secondary mb-4"></p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">
              Une erreur inattendue s&apos;est produite lors de la vérification
              de votre email.
            </p>
          </div>
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
  };

  return (
    <div className="container h-full flex items-center justify-center py-8">
      {renderVerificationContent()}
    </div>
  );
}
