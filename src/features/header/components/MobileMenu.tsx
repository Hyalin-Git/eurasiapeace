"use client";
import { NavigationItems } from "@/features/header/types";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu({
  navigationItems,
}: {
  navigationItems: NavigationItems[];
}) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    setOpenSubmenu(null); // Fermer tous les sous-menus quand on ferme le menu principal

    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.add("open-burger");
    }
  }

  function toggleSubmenu(label: string) {
    setOpenSubmenu(openSubmenu === label ? null : label);
  }

  function closeMenu() {
    setIsMenuOpen(false);
    setOpenSubmenu(null);

    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.remove("open-burger");
    }
  }

  return (
    <div
      className="xl:hidden flex items-center gap-4 h-full"
      ref={mobileMenuRef}
    >
      {/* Bouton burger */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 cursor-pointer"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu mobile */}
      {isMenuOpen &&
        createPortal(
          <div className="relative h-full w-full">
            <div className="fixed top-0 left-0 w-full z-[1000]">
              <div className="bg-white">
                {/* Header du menu */}
                <div className="flex justify-between items-center mb-6 p-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/eurasia-logo.svg"
                      alt="logo"
                      width={40}
                      height={40}
                    />
                    <span className="font-bold text-xl hidden sm:inline uppercase">
                      EurasiaPeace
                    </span>
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="p-2 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="border-b border-text-primary p-4 pb-0">
                  {/* <div className={`border-b border-gray-200 pb-2`}>
                    <div className="flex justify-between items-center w-full">
                      <Link
                        href={"/connexion"}
                        onClick={closeMenu}
                        className={`group flex items-center gap-2 py-4 px-3 text-gray-700 hover:text-btn-force-blue transition-colors`}
                      >
                        Connexion
                      </Link>
                      <button
                        onClick={() => toggleSubmenu("Connexion")}
                        className="flex-1 flex justify-end items-center p-2 cursor-pointer"
                        aria-label={`Toggle Connexion submenu`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            openSubmenu === "Connexion" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {openSubmenu === "Connexion" && (
                      <div className="flex items-stretch gap-3 ml-4">
                        <div className="border-l-2 border-gray-300 rounded-l-sm self-stretch flex-shrink-0 w-0.5 mb-[24px]"></div>
                        <div className="flex-1">
                          <Link
                            href={"/connexion"}
                            onClick={closeMenu}
                            className="menu-custom-list relative block py-2 px-2 text-gray-600 hover:text-btn-force-blue transition-colors"
                          >
                            Se connecter
                          </Link>
                          <Link
                            href={"/inscription"}
                            onClick={closeMenu}
                            className="menu-custom-list relative block py-2 px-2 text-gray-600 hover:text-btn-force-blue transition-colors"
                          >
                            S&apos;inscrire
                          </Link>
                        </div>
                      </div>
                    )}
                  </div> */}

                  {navigationItems.map((item, index) => {
                    const hasItems = item?.items && item?.items?.length > 0;
                    const isSubmenuOpen = openSubmenu === item.label;
                    const isLast = index === navigationItems.length - 1;

                    return (
                      <div
                        key={index}
                        className={`border-b border-gray-200 pb-2 ${
                          isLast ? "border-b-0" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <Link
                            href={item?.href || "#"}
                            onClick={item?.href ? closeMenu : undefined}
                            className={`group flex justify-between items-center gap-2 py-3 px-2 ${
                              !hasItems ? "w-full" : ""
                            } text-gray-700 hover:text-btn-force-blue transition-colors`}
                          >
                            {item.label}
                            {!hasItems && (
                              <ChevronRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform duration-200"
                              />
                            )}
                          </Link>
                          {hasItems && (
                            <button
                              onClick={() => toggleSubmenu(item.label)}
                              className="flex-1 flex justify-end items-center p-2 cursor-pointer"
                              aria-label={`Toggle ${item.label} submenu`}
                            >
                              <ChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${
                                  isSubmenuOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Sous-menu */}
                        {hasItems && isSubmenuOpen && (
                          <div className="flex items-stretch gap-3 ml-4">
                            <div className="border-l-2 border-gray-300 rounded-l-sm self-stretch flex-shrink-0 w-0.5 mb-[24px]"></div>
                            <div className="flex-1">
                              {item.items?.map((subItem, idx) => {
                                return (
                                  <div key={idx}>
                                    <Link
                                      href={subItem?.slug || "#"}
                                      onClick={closeMenu}
                                      className="menu-custom-list relative block py-2 px-2 text-gray-600 hover:text-btn-force-blue transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div
              className="fixed top-0 left-0 h-full w-full z-[999] bg-black/60 backdrop-blur-xs"
              onClick={closeMenu}
            ></div>
          </div>,
          document.body
        )}
    </div>
  );
}
