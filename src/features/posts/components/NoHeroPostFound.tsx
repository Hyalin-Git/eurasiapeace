"use server";

import { BookText } from "lucide-react";

export default async function NoHeroPostFound() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="flex flex-col items-center text-center p-8">
        <div className="text-gray-400 mb-4">
          <BookText size={32} />
        </div>
        <h3 className="text-md lg:text-lg font-medium text-gray-900 mb-2">
          Aucun contenu disponible
        </h3>
        <p className="text-sm text-gray-500">
          Les publications apparaîtront ici dès qu&apos;elles seront
          disponibles.
        </p>
      </div>
    </div>
  );
}
