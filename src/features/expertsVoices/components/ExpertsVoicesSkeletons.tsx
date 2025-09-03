export function ExpertVoiceSkeleton({ single = true }: { single?: boolean }) {
  return (
    <div className="flex flex-col bg-background-light-primary rounded-md border border-gray-200 h-full text-left shadow-sm">
      {/* Card header - Banner avec catégorie */}
      <div className="relative">
        {/* Banner skeleton */}
        <div
          className={`relative bg-gray-200 rounded-t-md w-full animate-pulse ${
            single ? "h-[360px]" : "h-[200px]"
          }`}
        ></div>

        {/* Category skeleton en overlay */}
        <div className="absolute top-3 left-3">
          <div className="bg-gray-300 rounded-sm h-6 w-20 animate-pulse"></div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Card meta - Tags et date */}
          <div className="flex items-start justify-between mb-8">
            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2 max-w-[80%]">
              <div className="bg-gray-200 rounded-full h-5 w-16 animate-pulse"></div>
              <div className="bg-gray-200 rounded-full h-5 w-20 animate-pulse"></div>
              <div className="bg-gray-200 rounded-full h-5 w-14 animate-pulse"></div>
            </div>
            {/* Date skeleton */}
            <div className="bg-gray-200 rounded h-4 w-24 animate-pulse min-w-max"></div>
          </div>

          {/* Card body - Titre et extrait */}
          <div>
            {/* Titre skeleton */}
            <div className="mb-4">
              <div className="bg-gray-300 rounded h-6 w-full mb-2 animate-pulse"></div>
              <div className="bg-gray-300 rounded h-6 w-3/4 animate-pulse"></div>
            </div>

            {/* Extrait skeleton */}
            <div className="mb-4 space-y-2">
              <div className="bg-gray-200 rounded h-4 w-full animate-pulse"></div>
              <div className="bg-gray-200 rounded h-4 w-full animate-pulse"></div>
              <div className="bg-gray-200 rounded h-4 w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Card footer - Lien "En savoir plus" */}
        <div className="flex items-center justify-end">
          <div className="bg-gray-200 rounded h-5 w-28 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function ExpertsVoicesSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ExpertVoiceSkeleton key={index} single={false} />
      ))}
    </div>
  );
}
