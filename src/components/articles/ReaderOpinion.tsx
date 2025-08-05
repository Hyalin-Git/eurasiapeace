"use client";

export default function ReaderOpinion() {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Cet article vous a-t-il été utile ?
      </h3>
      <div className="flex justify-center gap-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg border transition-colors
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span>Utile</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg border transition-colors 
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
        >
          <svg
            className="w-5 h-5 transform rotate-180"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span>Peu utile</span>
        </button>
      </div>
    </div>
  );
}
