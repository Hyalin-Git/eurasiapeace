"use server";

import LinkButton from "@/ui/LinkButton";
import { GraduationCap, Search } from "lucide-react";

export default async function NoFormationsFound({
  hasFilters = false,
}: {
  hasFilters?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="mb-6">
        <GraduationCap
          size={64}
          className="text-gray-400 mx-auto mb-4"
          strokeWidth={1.5}
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        {hasFilters
          ? "Aucune formation trouvée"
          : "Aucune formation disponible"}
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        {hasFilters
          ? "Nous n'avons pas trouvé de formations correspondant à vos critères de recherche. Essayez d'ajuster vos filtres."
          : "Il n'y a actuellement aucune formation disponible. Revenez bientôt pour découvrir nos nouveaux programmes de formation."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {hasFilters && (
          <LinkButton
            icon={<Search size={18} />}
            label="Réinitialiser les filtres"
            href="/formations"
            className="min-w-48 bg-midnight-green hover:bg-midnight-green/90 font-semibold transition-colors duration-300"
          />
        )}
      </div>
    </div>
  );
}
