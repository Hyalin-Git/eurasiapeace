export default function CommitteesMemberSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Card decoration skeleton */}
      <div className="hidden md:block absolute top-0 right-0 w-52 h-52 bg-gray-100 rounded-bl-full animate-pulse"></div>

      <div className="p-6">
        {/* Heading skeleton */}
        <div className="mb-4">
          <div className="h-8 w-40 bg-gray-300 rounded animate-pulse"></div>

          <div className="mt-2 h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Expertises skeleton */}
        <div className="mb-8">
          <div className="h-6 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>

          <div className="flex flex-wrap gap-4 sm:max-w-[85%]">
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Biography skeleton */}
        <div>
          <div className="h-6 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommitteesMemberSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <CommitteesMemberSkeleton key={index} />
      ))}
    </div>
  );
}
