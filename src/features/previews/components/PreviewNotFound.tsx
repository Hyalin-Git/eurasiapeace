"use server";

import { FileText } from "lucide-react";

export default async function PreviewNotFound() {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="mb-6">
        <FileText
          size={64}
          className="text-gray-400 mx-auto mb-4"
          strokeWidth={1.5}
        />
      </div>

      <h2 className="font-semibold text-gray-800 mb-3">
        Aperçu non disponible
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Nous n'avons pas trouvé d'aperçu pour cet article.
      </p>
    </div>
  );
}
