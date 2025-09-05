"use client";

import Toast from "@/components/Toast";
import { useSubscription } from "@/context/SubscriptionContext";
import { createPayementCheckout } from "@/server/api/stripe";
import Button from "@/ui/Button";
import { showPaywall } from "@/utils/showPaywall";
import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostDownload({
  postTitle,
  category,
  fileUrl,
  isPublic,
}: {
  postTitle: string;
  category:
    | {
        name: string;
        slug: string;
      }
    | undefined;
  fileUrl: string | undefined;
  isPublic: string;
}) {
  const [showToast, setShowToast] = useState<boolean>(false);
  const { hasEurasiaPeaceSubscription } = useSubscription();
  const router = useRouter();

  const rightCategory =
    category?.name === "Notes d'analyse" ||
    category?.name === "Dossiers thématiques" ||
    category?.name === "Rapports de renseignement";

  if (!rightCategory) {
    return null;
  }

  // TODO : Gérer l'achat du PDF si non abonné

  if (!fileUrl) return null;

  const isPaywall = showPaywall(isPublic, hasEurasiaPeaceSubscription);

  async function handlePdfPurchase() {
    // Logique d'achat du PDF à l'unité
    let price = 490; // Prix par défaut

    if (category?.name === "Rapports de renseignement") {
      price = 990; // Prix pour Rapports de renseignement
    } else if (category?.name === "Dossiers thématiques") {
      price = 1490; // Prix pour Dossiers thématiques
    } else if (category?.name === "Notes d'analyse") {
      price = 490; // Prix pour Notes d'analyse
    }

    const { data, success, status } = await createPayementCheckout(
      postTitle || "Achat PDF à l'unité",
      `https://api-eura.akdigital.fr/wp-content/uploads${
        fileUrl?.split("uploads")[1]
      }`,
      price
    );

    // Handle error if not authenticated (refresh token failed)
    if (!success && status === 401) {
      return router.push("/connexion?redirect_url=/abonnements");
    }

    // Handle error if session creation failed
    if (!success && status !== 401) {
      setShowToast(true);
      return;
    }

    return router.push(data.url);
  }

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

          {/* Affichage du bouton de téléchargement si pas de paywall */}
        </div>
      </div>
      {isPaywall ? (
        <div className="flex flex-col justify-center items-center mt-4 gap-2">
          <Link
            href="/abonnements"
            className="bg-midnight-green text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-midnight-green/90 transition-colors w-full"
          >
            Découvrir nos abonnements
          </Link>
          <div className="relative w-full text-center">
            <div className="absolute z-0 top-3 w-full h-0.5 bg-gray-200"></div>
            <span className="relative z-10 px-4 bg-white">Ou</span>
          </div>

          <Button
            type="button"
            className="bg-white text-text-primary! px-6 py-3 text-center rounded-lg font-medium border border-midnight-green hover:bg-midnight-green/10! transition-colors w-full"
            onClick={handlePdfPurchase}
          >
            Acheter le PDF
          </Button>
        </div>
      ) : (
        <div className="flex justify-center mt-4 flex-row gap-4">
          <a
            href={`/media${fileUrl.split("uploads")[1]}`}
            download
            target="_blank"
            className="inline-flex items-center justify-center gap-2 bg-midnight-green text-white px-2.5 py-2 rounded-md hover:bg-midnight-green/90 transition-all duration-200 ease-in-out w-full"
          >
            <Download className="h-4 w-4 group-hover:animate-pulse" />
            Télécharger le PDF
          </a>
        </div>
      )}

      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        success={false}
        message="Une erreur est survenue de notre côté. Veuillez réessayer."
      />
    </div>
  );
}
