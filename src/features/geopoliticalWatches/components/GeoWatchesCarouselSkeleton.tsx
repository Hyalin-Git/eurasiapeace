export default function GeoWatchesCarouselSkeleton() {
  // Créer un tableau de 12 éléments pour simuler le chargement
  const skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  // Dupliquer pour avoir le même effet de scroll infini
  const extendedSkeleton = [
    ...skeletonItems,
    ...skeletonItems,
    ...skeletonItems,
  ];

  return (
    <div className="bg-headband mb-[50px] py-9 overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex w-fit">
          {extendedSkeleton.map((_, index) => (
            <div key={index} className="mr-[2rem] min-w-fit flex-shrink-0">
              <div className="flex flex-col h-full text-xs gap-1 px-4 max-w-90">
                <div className="flex items-center gap-2">
                  {/* Skeleton pour le badge de type */}
                  <div className="h-6 w-20 bg-gray-300 rounded-sm animate-pulse"></div>
                  {/* Skeleton pour la date */}
                  <div className="h-4 w-16 bg-gray-400/50 rounded animate-pulse"></div>
                </div>
                {/* Skeleton pour le titre */}
                <div className="space-y-1">
                  <div className="h-4 w-48 bg-gray-400/50 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-400/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
