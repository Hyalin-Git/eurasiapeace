"use client";

import { useAuth } from "@/context/AuthProvider";
import { showPaywall } from "@/utils/showPaywall";
import { Download, FileText } from "lucide-react";

export default function PostDownload({
  fileUrl,
  isPublic,
}: {
  fileUrl: string | undefined;
  isPublic: string;
}) {
  const { user } = useAuth();
  // TODO : Afficher ou non le boutton selon l'abonnement requis pour le télécharger en PDF alors proposer de s'abonner etc...

  if (!fileUrl) return null;

  const isPaywall = showPaywall(isPublic, user);

  if (isPaywall === true) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="bg-btn-force-blue/10 p-3 rounded-lg">
          <FileText className="h-6 w-6 text-midnight-green" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-text-primary text-lg mb-1">
              Article disponible en PDF
            </h3>
            <p className="text-text-secondary text-sm">
              Téléchargez cet article.
            </p>
          </div>

          <a
            href={`/media${fileUrl.split("uploads")[1]}`}
            download
            target="_blank"
            className="inline-flex items-center gap-2 bg-midnight-green text-white px-2.5 py-2 rounded-md hover:bg-midnight-green/90 transition-all duration-200 ease-in-out"
          >
            <Download className="h-4 w-4 group-hover:animate-pulse" />
            Télécharger le PDF
          </a>
        </div>
      </div>
    </div>
  );
}
