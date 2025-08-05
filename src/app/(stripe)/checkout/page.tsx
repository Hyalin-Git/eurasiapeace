"use server";

import { refreshAccessToken } from "@/server/api/auth";
import LinkButton from "@/ui/LinkButton";
import { CircleCheck, CircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { mutate } from "swr";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    canceled?: string;
  }>;
}) {
  const { success, canceled } = await searchParams;
  // const searchParams = useSearchParams();

  // const success = searchParams.get("success");
  // const canceled = searchParams.get("canceled");

  // async function handleUpdateUser() {
  //   await refreshAccessToken();
  //   await mutate("/api/auth/verify-token");
  // }

  // useEffect(() => {
  //   handleUpdateUser();
  // }, []);

  return (
    <div className="container py-12 h-full">
      {/* Success */}
      {success && (
        <div className="flex flex-col justify-center items-center gap-2 h-full">
          <CircleCheck size={220} className="text-midnight-green" />
          <h1 className="text-2xl font-bold">
            Votre abonnement a été activé avec succès
          </h1>

          <p className="text-center max-w-md text-gray-500">
            Vous allez recevoir votre facture ainsi qu&apos;un email de
            confirmation dans les prochaines minutes. <br /> <br /> Vous pouvez
            dès maintenant accéder à l&apos;ensemble de nos contenus premium.
          </p>
          <div className="flex gap-2 mt-4">
            <LinkButton
              href="/"
              label="Retourner à la page d'accueil"
              className="bg-transparent! border! border-midnight-green! text-midnight-green! hover:bg-midnight-green/10!"
            />

            <LinkButton
              href="/publications"
              label="Voir nos publications"
              className="bg-midnight-green text-white hover:bg-midnight-green/90"
            />
          </div>
        </div>
      )}

      {/* Canceled */}
      {canceled && (
        <div className="flex flex-col justify-center items-center gap-2 h-full">
          <CircleX size={220} className="text-red-500" />
          <h1 className="text-2xl font-bold">Paiement annulé</h1>

          <p className="text-center max-w-md text-gray-500">
            Vous pouvez retourner à la page d&apos;accueil ou revenir à la page
            précédente.
          </p>
          <div className="flex gap-2 mt-4">
            {/* <Button type="button" onClick={() => router.back()}>
              Revenir à la page précédente
            </Button>
            <Button type="button" onClick={() => router.push("/")}>
              Retourner à la page d&apos;accueil
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
