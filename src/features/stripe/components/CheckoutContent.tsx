"use client";

import { refreshAccessToken } from "@/server/api/auth";
import LinkButton from "@/ui/LinkButton";
import { CircleCheck, CircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { mutate } from "swr";

export default function CheckoutContent() {
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  async function handleUpdateUser() {
    await refreshAccessToken();
    await mutate("/api/auth/verify-token");
  }

  useEffect(() => {
    handleUpdateUser();
  }, []);

  return (
    <div
      className={`h-full min-h-screen flex items-center justify-center ${
        success ? "bg-green-50" : canceled ? "bg-red-50" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="w-full max-w-md mx-auto rounded-xl shadow-lg border p-8 flex flex-col items-center gap-6 bg-white">
        {/* Success */}
        {success && (
          <>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-green-100 mb-2">
              <CircleCheck size={80} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 mb-2 text-center">
              Votre abonnement a été activé avec succès
            </h1>
            <p className="text-center max-w-md text-gray-700 mb-2">
              Vous allez recevoir votre facture ainsi qu&apos;un email de
              confirmation dans les prochaines minutes.
              <br />
              <br />
              Vous pouvez dès maintenant accéder à l&apos;ensemble de nos
              contenus premium.
            </p>
            <div className="flex flex-col gap-2 w-full mt-2">
              <LinkButton
                href="/"
                label="Retourner à la page d'accueil"
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Canceled */}
        {canceled && (
          <>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-red-100 mb-2">
              <CircleX size={80} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-red-800 mb-2 text-center">
              Paiement annulé
            </h1>
            <p className="text-center max-w-md text-gray-700 mb-2">
              Vous avez annulé votre paiement. <br /> Vous pouvez retourner à la
              page d&apos;accueil.
            </p>
            <div className="flex flex-col gap-2 w-full mt-2">
              <LinkButton
                href="/"
                label="Retourner à l'accueil"
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
