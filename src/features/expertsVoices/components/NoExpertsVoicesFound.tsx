"use server";

import LinkButton from "@/ui/LinkButton";
import { Globe, Search } from "lucide-react";

export default async function NoExpertsVoicesFound({
  hasFilters = false,
}: {
  hasFilters?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="mb-6">
        <Globe
          size={64}
          className="text-gray-400 mx-auto mb-4"
          strokeWidth={1.5}
        />
      </div>

      <h2 className="font-semibold text-gray-800 mb-3">
        {hasFilters
          ? "Aucune voix d'expert trouvée"
          : "Aucune voix d'expert disponible"}
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        {hasFilters
          ? "Nous n'avons pas trouvé de voix d'expert correspondant à vos critères de recherche. Essayez d'ajuster vos filtres."
          : "Il n'y a actuellement aucune voix d'expert disponible. Revenez bientôt pour découvrir de nouveaux contenus."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {hasFilters && (
          <LinkButton
            icon={<Search size={18} />}
            label="Réinitialiser les filtres"
            href="/la-voix-des-experts"
            className="min-w-48 bg-midnight-green hover:bg-midnight-green/90 font-semibold transition-colors duration-300"
          />
        )}
      </div>
    </div>
  );
}
