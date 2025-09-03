"use client";

import Separator from "@/ui/Separator";
import UserInfo from "@/features/user/components/UserInfo";
import UserUpdatePassword from "@/features/user/components/UserUpdatePassword";
import { useAuth } from "@/context/AuthProvider";
import { useUser } from "@/features/user/hooks/useUser";

export default function MonCompte() {
  const { user: authUser } = useAuth();
  const { data: user, isLoading, mutate } = useUser(authUser?.id || "");

  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6 py-10">
      <UserInfo user={user} isLoading={isLoading} mutate={mutate} />

      <Separator className="my-10" />

      <UserUpdatePassword user={user} />
    </div>
  );
}
