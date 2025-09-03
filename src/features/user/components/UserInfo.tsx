"use client";

import Section from "@/components/Section";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UserInfoEdit from "./UserInfoEdit";
import Button from "@/ui/Button";
import moment from "moment";
import "moment/locale/fr";
import { User } from "../types";
import UserInfoSkeleton from "./UserInfoSkeleton";
import { set } from "nprogress";
import UserUpdateEmail from "./UserUpdateEmail";

export default function UserInfo({
  user,
  isLoading,
  mutate,
}: {
  user: User;
  isLoading: boolean;
  mutate: () => void;
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);

  if (isLoading) return <UserInfoSkeleton />;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  function handleIsEdit() {
    setIsEdit(true);
    setIsEditingEmail(false);
  }

  function handleIsEditingEmail() {
    setIsEditingEmail(true);
    setIsEdit(false);
  }

  return (
    <Section
      icon={<User2 className="text-btn-force-blue" size={32} />}
      title="Profil"
      description="Vos informations personnelles."
      className="pt-0!"
    >
      <div className="flex justify-between items-baseline flex-col md:flex-row">
        <div className="flex gap-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={user?.avatar?.url || "/default-avatar.webp"}
              alt={`Avatar de ${fullName}`}
              width={96}
              height={96}
              quality={100}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="mt-2">
            <p className="font-semibold text-md">{fullName}</p>
            <p className="text-black/60 text-sm">
              {user?.email}{" "}
              <span
                className="text-xs text-midnight-green font-medium cursor-pointer"
                onClick={handleIsEditingEmail}
              >
                (Modifier mon adresse e-mail)
              </span>
            </p>
            <p className="text-black/60 text-sm">Visiteur</p>
            <p className="text-black/60 text-sm">
              Membre depuis le {moment(user?.registeredDate).format("LL")}
            </p>
          </div>
        </div>

        {!isEdit && (
          <div className="mt-6 md:mt-0">
            <Button type="button" onClick={handleIsEdit}>
              Modifier le profil
            </Button>
          </div>
        )}
      </div>
      {isEdit && (
        <UserInfoEdit user={user} setIsEdit={setIsEdit} mutate={mutate} />
      )}

      {isEditingEmail && (
        <UserUpdateEmail user={user} setIsEditingEmail={setIsEditingEmail} />
      )}
    </Section>
  );
}
