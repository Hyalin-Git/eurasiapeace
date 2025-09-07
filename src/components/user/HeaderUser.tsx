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
import { AuthUser } from "@/types";
import { useSubscription } from "@/context/SubscriptionContext";

export default function HeaderUser({ user }: { user: AuthUser }) {
  const { hasContributorSubscription, hasEurasiaPeaceSubscription } =
    useSubscription();
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
    router.push("/connexion");
  }

  async function handleCustomerPortal() {
    // Redirect to the customer portal for managing subscriptions
    const customerId = user?.customerId;

    if (!customerId) return;

    const { data, success } = await createPortalSession(customerId);

    if (!success) {
      console.error("Error creating portal session:", data);

      return;
    }

    // Redirect to the portal session URL
    router.push(data?.url);
  }

  function displaySubscription() {
    if (!hasContributorSubscription && !hasEurasiaPeaceSubscription) {
      return "Visiteur";
    }

    if (hasContributorSubscription) return "Contributeur spécial";
    if (hasEurasiaPeaceSubscription) return "Abonné EurasiaPeace";

    return "Visiteur";
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
        className={`relative flex items-start gap-2 max-w-[170px] truncate text-sm font-[600] text-btn-force-blue  bg-btn-force-blue/20 py-2 px-2 sm:px-4 rounded-lg hover:bg-btn-force-blue/40  transition-all duration-300 ease-in-out cursor-pointer ${
          isOpen ? "bg-btn-force-blue/40" : ""
        }`}
      >
        <CircleUserRound size={28} />
        <div className="flex flex-col w-full">
          <Link
            href={"/mon-compte"}
            className="before:absolute before:z-1 before:content-[''] before:top-0 before:left-0 before:right-0 before:bottom-0 truncate w-full"
          >
            {user?.firstName} {user?.lastName}
          </Link>
          <span className="text-[12px]! text-gray-500/60! font-medium! truncate w-full">
            {displaySubscription()}
          </span>
        </div>
      </div>

      {/* Floating menu */}
      <DropdownHeader floatingConfig={{ refs, floatingStyles }} isOpen={isOpen}>
        <ul className="[&>li]:p-2 [&>li]:text-sm [&>li]:font-medium [&>li]:cursor-pointer [&>li]:hover:bg-btn-force-blue/10 [&>li]:hover:text-btn-force-blue [&>li]:transition-all [&>li]:duration-300 [&>li]:ease-in-out">
          <li>
            <Link href="/mon-compte" className="flex items-center gap-2">
              <User size={16} />
              Mon compte
            </Link>
          </li>
          {(hasEurasiaPeaceSubscription || hasContributorSubscription) &&
            user?.customerId && (
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
