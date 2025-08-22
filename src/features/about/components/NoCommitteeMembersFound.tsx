"use server";

import LinkButton from "@/ui/LinkButton";
import { Users, Home } from "lucide-react";

export default async function NoCommitteeMembersFound() {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="mb-6">
        <Users
          size={64}
          className="text-gray-400 mx-auto mb-4"
          strokeWidth={1.5}
        />
      </div>

      <h2 className="font-semibold text-gray-800 mb-3">
        Aucun membre du comité disponible
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Il n&apos;y a actuellement aucun membre du comité affiché. Les
        informations seront mises à jour prochainement.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <LinkButton
          icon={<Home size={18} />}
          label="Retour à l'accueil"
          href="/"
          className="min-w-48 bg-btn-force-blue hover:bg-btn-force-blue-hover font-semibold transition-colors duration-300"
        />
      </div>
    </div>
  );
}
