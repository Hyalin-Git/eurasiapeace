"use client";

import { signOut } from "@/server/api/auth";
import { offset, shift, useFloating } from "@floating-ui/react";
import { CircleUserRound, LogOut, ReceiptText, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mutate } from "swr";
import DropdownHeader from "@/components/dropdown/DropdownHeader";
import { createPortalSession } from "@/server/api/stripe";
import { useRouter } from "next/navigation";
import { User as UserInterface } from "@/types";

export default function HeaderUser({ user }: { user: UserInterface }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(5), shift({ padding: 8 })],
  });

  async function handleLogout() {
    await signOut();
    await mutate("/api/auth/verify-token");
  }

  const userPlan =
    user?.role === "subscriber"
      ? "Membre EurasiaPeace"
      : user?.role === "contributor"
      ? "Contributeur EurasiaPeace"
      : "Visiteur";

  const hasUserPlan =
    user?.role === "subscriber" || user?.role === "contributor";

  async function handleCustomerPortal() {
    // Redirect to the customer portal for managing subscriptions
    const customerId = user?.customerId || "";
    const { data, success } = await createPortalSession(customerId);

    if (!success) {
      console.error("Error creating portal session:", data);
      return;
    }

    // Redirect to the portal session URL
    router.push(data?.url);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* User */}
      <div
        ref={refs.setReference}
        className={`flex items-start gap-2 text-sm font-[600] text-btn-force-blue  bg-btn-force-blue/20 py-2 px-4 rounded-lg hover:bg-btn-force-blue/40  transition-all duration-300 ease-in-out cursor-pointer ${
          isOpen ? "bg-btn-force-blue/40" : ""
        }`}
      >
        <CircleUserRound size={24} />
        <div className="flex flex-col">
          {user?.firstName} {user?.lastName}
          <span className="text-[12px]! text-gray-500/60! font-medium!">
            {userPlan}
          </span>
        </div>
      </div>

      {/* Floating menu */}
      <DropdownHeader floatingConfig={{ refs, floatingStyles }} isOpen={isOpen}>
        <ul className="[&>li]:p-2 [&>li]:text-sm [&>li]:font-medium [&>li]:cursor-pointer [&>li]:hover:bg-btn-force-blue/10 [&>li]:hover:text-btn-force-blue [&>li]:transition-all [&>li]:duration-300 [&>li]:ease-in-out">
          <li>
            <Link href="/profil" className="flex items-center gap-2">
              <User size={16} />
              Mon profil
            </Link>
          </li>
          {hasUserPlan && (
            <li
              className="flex items-center gap-2"
              onClick={handleCustomerPortal}
            >
              <ReceiptText size={16} />
              Gérer ma facturation
            </li>
          )}
          <li
            className="flex items-center gap-2 text-red-500 hover:text-red-600!"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Se déconnecter
          </li>
        </ul>
      </DropdownHeader>
    </div>
  );
}
