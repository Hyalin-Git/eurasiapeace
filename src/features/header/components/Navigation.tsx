"use client";
import DropdownHeader from "@/components/dropdown/DropdownHeader";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { offset, shift, useFloating } from "@floating-ui/react";
import { NavigationItems } from "../types";

export default function Navigation({ elt }: { elt: NavigationItems }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(5), shift({ padding: 8 })],
  });

  function handleClick() {
    setIsOpen(false);
  }

  const hasItems = elt?.items?.length > 0;
  const isActive = pathname === elt?.href;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {elt?.href ? (
        <Link
          href={elt?.href || ""}
          key={elt?.label}
          ref={refs.setReference}
          className={`flex items-center gap-1 px-3 py-2 rounded-md group-hover:bg-btn-purple/10 group-hover:text-btn-force-blue transition-all duration-300 ease-in-out cursor-pointer ${
            isActive ? "text-btn-force-blue" : ""
          }`}
        >
          {elt?.label}
          {hasItems && (
            <ChevronDown
              size={18}
              className="group-hover:rotate-180 transition-all duration-300 ease-in-out"
            />
          )}
        </Link>
      ) : (
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-md group-hover:bg-btn-purple/10 group-hover:text-btn-force-blue transition-all duration-300 ease-in-out cursor-pointer"
          ref={refs.setReference}
        >
          {elt?.label}
          {hasItems && (
            <ChevronDown
              size={18}
              className="group-hover:rotate-180 transition-all duration-300 ease-in-out"
            />
          )}
        </div>
      )}

      {/* Floating menu */}
      <DropdownHeader
        floatingConfig={{ refs, floatingStyles }}
        isOpen={isOpen}
        className="w-70!"
      >
        <ul className="[&>li]:p-2 [&>li]:text-sm [&>li]:font-medium [&>li]:cursor-pointer [&>li]:hover:bg-btn-force-blue/10 [&>li]:hover:text-btn-force-blue [&>li]:transition-all [&>li]:duration-300 [&>li]:ease-in-out">
          {elt.items.map((item, idx) => {
            return (
              <li key={idx}>
                <Link href={item?.slug} onClick={handleClick}>
                  {item?.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </DropdownHeader>
    </div>
  );
}
