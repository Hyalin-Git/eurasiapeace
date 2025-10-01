"use client";

import { signOut } from "@/server/api/auth";
import { offset, shift, useFloating } from "@floating-ui/react";
import { LogOut, ReceiptText, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import DropdownHeader from "@/components/dropdown/DropdownHeader";
import { createPortalSession } from "@/server/api/stripe";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/types";
import { useSubscription } from "@/context/SubscriptionContext";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useUserRole } from "@/context/UserRoleContext";

export default function UserHeader({ authUser }: { authUser: AuthUser }) {
  const { data: user, isLoading } = useUser(authUser?.id || "");
  const { hasContributorSubscription, hasEurasiaPeaceSubscription } =
    useSubscription();
  const { userRole } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isMobile ? "bottom-end" : "bottom-start",
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
    if (userRole.includes("administrator")) return "Administrateur";

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
        className={`relative flex items-center gap-2 max-w-[170px] truncate text-sm font-[600] text-btn-force-blue md:bg-btn-force-blue/20 md:py-2 md:px-2 sm:md:px-4 md:rounded-lg md:hover:bg-btn-force-blue/40 transition-all duration-300 ease-in-out cursor-pointer p-2 md:p-0 ${
          isOpen ? "md:bg-btn-force-blue/40" : ""
        }`}
      >
        {isLoading ? (
          <div className="rounded-full min-w-9 min-h-9 w-9 h-9 md:min-w-7 md:min-h-7 md:w-7 md:h-7 bg-gray-200 animate-pulse" />
        ) : (
          <Image
            src={user?.customAvatar || "/default-avatar.webp"}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full min-w-9 min-h-9 w-9 h-9 md:min-w-7 md:min-h-7 md:w-7 md:h-7"
          />
        )}

        <div className="flex-col w-full hidden md:flex">
          {isLoading ? (
            <>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-24 bg-gray-200/80 rounded animate-pulse" />
            </>
          ) : (
            <>
              <Link
                href={"/mon-compte"}
                className="before:absolute before:z-1 before:content-[''] before:top-0 before:left-0 before:right-0 before:bottom-0 truncate w-full"
              >
                {user?.firstName} {user?.lastName}
              </Link>
              <span className="text-[12px]! text-gray-500/60! font-medium! truncate w-full">
                {displaySubscription()}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Floating menu */}
      <DropdownHeader
        floatingConfig={{ refs, floatingStyles }}
        isOpen={isOpen}
        className={isMobile ? "mr-2" : ""}
      >
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
