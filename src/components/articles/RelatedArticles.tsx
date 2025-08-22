export default function RelatedArticles({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} bg-white rounded-lg shadow-md p-4 border border-gray-200`}
    >
      <div className="flex items-center gap-3 mb-6 ">
        <div className="w-8 h-8 bg-midnight-green rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-text-primary text-lg">
          Articles à lire dans cette rubrique
        </h3>
      </div>
      {children}
    </div>
  );
}
