"use client";

import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import UserHeader from "@/components/header/UserHeader";

export default function Header({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`relative ${isScrolled ? "h-[80px] " : "h-[100px]"}`}>
      <header
        className={`left-0 right-0 shadow-sm top-0 z-100 bg-background-primary fixed transition-all duration-200 ease-in-out ${
          isScrolled ? "h-[80px]" : "h-[100px]"
        }`}
      >
        <nav className="xl:container flex items-center justify-between gap-2 sm:gap-4 h-full w-full mx-auto px-2">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-1 xl:flex-none"
          >
            <Image
              src="/eurasia-logo.svg"
              alt="logo"
              width={60}
              height={60}
              className="w-auto h-auto"
            />
            <span className="font-bold text-sm sm:text-md uppercase hidden min-[295px]:inline">
              EurasiaPeace
            </span>
          </Link>
          {/* Navigations */}
          {children}
          {user ? (
            <div className="hidden xl:block">
              <UserHeader authUser={user} />
            </div>
          ) : (
            <Link
              href="/connexion"
              className="flex items-center gap-2 text-sm font-[600] text-btn-force-blue md:border md:border-btn-force-blue py-3 px-2 sm:px-4 rounded-lg hover:bg-btn-force-blue hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
            >
              <CircleUserRound className="w-[26px] h-[26px] md:w-[18px] md:h-[18px]" />
              <span className="hidden md:inline text-inherit">Connexion</span>
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
}
