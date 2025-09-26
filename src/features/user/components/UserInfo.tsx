"use client";

import Section from "@/components/Section";
import { Camera, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UserInfoEdit from "./UserInfoEdit";
import Button from "@/ui/Button";
import moment from "moment";
import "moment/locale/fr";
import { User } from "../types";
import UserInfoSkeleton from "./UserInfoSkeleton";
// import UserUpdateEmail from "./UserUpdateEmail";
import LinkButton from "@/ui/LinkButton";
import { useSubscription } from "@/context/SubscriptionContext";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/types";
import { createPortalSession } from "@/server/api/stripe";
import { useUserRole } from "@/context/UserRoleContext";
import { updateUserAvatar } from "../server/db/user";
import toast from "react-hot-toast";

export default function UserInfo({
  authUser,
  user,
  isLoading,
  mutate,
}: {
  authUser: AuthUser;
  user: User;
  isLoading: boolean;
  mutate: () => void;
}) {
  const {
    subscription,
    hasContributorSubscription,
    hasEurasiaPeaceSubscription,
  } = useSubscription();
  const { userRole } = useUserRole();
  const isContributeur = userRole.includes("contributor");
  const isAuthor = userRole.includes("author");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const router = useRouter();

  if (isLoading) return <UserInfoSkeleton />;

  const hasBoth = hasContributorSubscription && hasEurasiaPeaceSubscription;

  async function handleCustomerPortal() {
    // Redirect to the customer portal for managing subscriptions
    const customerId = authUser?.customerId;

    if (!customerId) return;

    const { data, success } = await createPortalSession(customerId);

    if (!success) {
      console.error("Error creating portal session:", data);

      return;
    }

    // Redirect to the portal session URL
    router.push(data?.url);
  }

  const fullName = `${user?.firstName} ${user?.lastName}`;

  function handleIsEdit() {
    setIsEdit(true);
    // setIsEditingEmail(false);
  }

  // function handleIsEditingEmail() {
  //   setIsEditingEmail(true);
  //   setIsEdit(false);
  // }

  async function handleUpdateAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { success } = await updateUserAvatar(user?.databaseId, file);

      if (!success) {
        toast.error(
          "Une erreur est survenue lors de la mise à jour de la photo de profil",
          {
            duration: 6000,
            position: "bottom-left",
          }
        );
      }

      toast.success("Photo de profil mis à jour avec succès", {
        duration: 6000,
        position: "bottom-left",
      });

      mutate();
    }
  }

  return (
    <Section
      icon={<User2 className="text-btn-force-blue" size={32} />}
      title="Mon compte"
      description="Vos informations personnelles."
      className="pt-0!"
    >
      <div className="flex justify-between items-baseline flex-col lg:flex-row">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
            <div className="w-full h-full relative">
              <Image
                src={user?.customAvatar || "/default-avatar.webp"}
                alt={`Avatar de ${fullName}`}
                width={96}
                height={96}
                quality={100}
                className="object-cover w-full h-full"
                priority
              />
              {isEdit && (
                <label
                  htmlFor="avatar"
                  className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center cursor-pointer"
                >
                  <Camera className="text-white" size={24} />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    className="hidden"
                    onChange={handleUpdateAvatar}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="mt-2">
            <p className="font-semibold text-md">{fullName}</p>
            <p className="text-black/60 text-sm">
              {user?.email}{" "}
              {/* <span
                className="text-xs text-midnight-green font-medium cursor-pointer"
                onClick={handleIsEditingEmail}
              >
                (Modifier mon adresse e-mail)
              </span> */}
            </p>
            <p className="text-black/60 text-sm">
              Abonnement(s) : {subscription}{" "}
              {hasBoth ? (
                <span
                  className="text-xs text-midnight-green font-medium cursor-pointer"
                  onClick={handleCustomerPortal}
                >
                  (Gérer mes abonnements)
                </span>
              ) : hasContributorSubscription ? (
                <span
                  className="text-xs text-midnight-green font-medium cursor-pointer"
                  onClick={handleCustomerPortal}
                >
                  (Gérer mon abonnement)
                </span>
              ) : hasEurasiaPeaceSubscription ? (
                <span
                  className="text-xs text-midnight-green font-medium cursor-pointer"
                  onClick={handleCustomerPortal}
                >
                  (Gérer mon abonnement)
                </span>
              ) : null}
            </p>
            <p className="text-black/60 text-sm">
              Membre depuis le {moment(user?.registeredDate).format("LL")}
            </p>
          </div>
        </div>

        {!isEdit && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0 w-full sm:w-auto">
            {hasContributorSubscription || isAuthor || isContributeur ? (
              <LinkButton
                href={`${process.env.NEXT_PUBLIC_WP_API_URI}`}
                blank={true}
                label="Espace rédacteur"
                className="bg-midnight-green hover:bg-midnight-green/90 w-full sm:w-fit"
              />
            ) : (
              <LinkButton
                href={"/abonnements"}
                label="Devenir rédacteur"
                className="bg-midnight-green hover:bg-midnight-green/90 w-full sm:w-fit"
              />
            )}

            <Button
              type="button"
              onClick={handleIsEdit}
              className="w-full sm:w-fit"
            >
              Modifier le profil
            </Button>
          </div>
        )}
      </div>
      {isEdit && (
        <UserInfoEdit user={user} setIsEdit={setIsEdit} mutate={mutate} />
      )}

      {/* {isEditingEmail && (
        <UserUpdateEmail user={user} setIsEditingEmail={setIsEditingEmail} />
      )} */}
    </Section>
  );
}
