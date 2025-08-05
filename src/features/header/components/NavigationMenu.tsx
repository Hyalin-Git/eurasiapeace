"use client";

import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { NavigationItems } from "../types";

export default function NavigationMenu({
  navigationItems,
}: {
  navigationItems: NavigationItems[];
}) {
  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {/* Menu desktop */}
      <div className="hidden xl:flex  items-center gap-2">
        {navigationItems?.map((elt, idx) => (
          <Navigation elt={elt} key={idx} />
        ))}
      </div>

      {/* Menu mobile - un seul composant pour tous les éléments */}
      <MobileMenu navigationItems={navigationItems} />
    </div>
  );
}
