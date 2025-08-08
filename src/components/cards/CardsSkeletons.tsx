export default function CardsSkeletons({
  numberOfCards = 6,
  variant = "publication",
}: {
  numberOfCards?: number;
  variant?: "publication" | "formation";
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${numberOfCards.toString()} gap-8`}
    >
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col bg-background-light-primary rounded-md border border-gray-200 h-full animate-pulse"
        >
          {/* Card Header - Banner avec catégorie */}
          <div className="relative h-[200px] w-full bg-gray-300 rounded-t-md">
            {/* Catégorie en overlay */}
            <div className="absolute top-3 left-3 h-6 w-20 bg-gray-400 rounded-full"></div>
            {/* Badges formation (si variant formation) */}
            {variant === "formation" && (
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-4 flex flex-col justify-between flex-1">
            <div>
              {/* Card Meta */}
              <div className="flex justify-between gap-2 mb-4">
                {variant === "publication" ? (
                  <>
                    {/* Tags et date */}
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-gray-300 rounded"></div>
                      <div className="h-5 w-16 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-5 w-20 bg-gray-300 rounded"></div>
                  </>
                ) : (
                  <>
                    {/* Infos formation */}
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                      <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-gray-300 rounded"></div>
                  </>
                )}
              </div>

              {/* Card Body */}
              <div>
                {/* Titre (2 lignes max) */}
                <div className="space-y-2 mb-4">
                  <div className="h-6 bg-gray-300 rounded w-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </div>

                {/* Extrait (3 lignes par défaut) */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div
              className={`flex items-center justify-end ${
                variant === "formation" && "mt-6"
              }`}
            >
              {variant === "publication" ? (
                /* Lien "En savoir plus" */
                <div className="h-5 w-28 bg-gray-300 rounded"></div>
              ) : (
                /* Bouton formation */
                <div className="absolute right-0 bottom-0 h-10 w-48 bg-gray-300 rounded-bl-none rounded-tr-none"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
