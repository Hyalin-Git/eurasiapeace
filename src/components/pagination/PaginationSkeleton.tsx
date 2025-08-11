export default function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2 text-center mt-8">
      {/* Bouton Précédent */}
      <div className="flex items-center gap-2 p-2">
        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
        <div className="hidden sm:block w-12 h-4 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Pages de pagination */}
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="py-2 px-4 rounded-sm w-10 h-9 bg-gray-300 animate-pulse"
        />
      ))}

      {/* Bouton Suivant */}
      <div className="flex items-center gap-1 p-2">
        <div className="hidden sm:block w-12 h-4 bg-gray-300 rounded animate-pulse" />
        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}
