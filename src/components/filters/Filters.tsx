"use client";

import Button from "@/ui/Button";
import { Funnel, ChevronDown, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { createPortal } from "react-dom";
import { Filters as FiltersInterface } from "@/types";

export default function Filters({
  filters,
  children,
}: {
  filters?: FiltersInterface;
  children?: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const queries = new URLSearchParams(params);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (filters !== null && filters !== undefined) {
      let totalCount = 0;
      Object.keys(filters).forEach((key) => {
        const filterKey = key as keyof FiltersInterface;

        if (filters[filterKey]?.terms && filters[filterKey]?.terms.length > 0) {
          totalCount += filters[filterKey].terms.length;
        }
      });
      setCount(totalCount);
    } else {
      setCount(0);
    }
  }, [filters]);

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function resetFilters() {
    // Keep the page parameter
    const page = queries.get("page");

    if (page) {
      router.push(`${pathname}?page=${page}`);
    } else {
      router.push(pathname);
    }
  }

  return (
    <div className="mb-8 select-none relative">
      {/* Header */}
      <div className="flex justify-between items-center rounded-t-lg cursor-pointer transition-[background-color] duration-300 gap-4">
        <div
          className="flex items-center gap-2 border border-gray-200 rounded-lg p-3 cursor-pointer"
          onClick={handleOpen}
        >
          <span className="flex items-center gap-2 text-lg text-text-primary font-semibold">
            <Funnel size={17} className="text-midnight-green" />
            Filtres
          </span>
          {count > 0 && (
            <span className="relative">
              <span className="text-white rounded-full bg-midnight-green w-6 h-6 flex items-center justify-center text-sm font-medium">
                {count}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetFilters();
                }}
                className="absolute top-[-7px] right-[-9px] w-4 h-4 bg-red-100 rounded-full justify-centerduration-200 shadow-sm flex items-center justify-center cursor-pointer border border-gray-200"
                title="Réinitialiser les filtres"
              >
                <X size={8} className="text-red-500" />
              </button>
            </span>
          )}
          <ChevronDown
            size={20}
            className={`text-midnight-green transition-all duration-300 ease-out ${
              isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
            }`}
          />
        </div>
        <SearchBar placeholder="Rechercher" />
      </div>

      {/* Dropdown */}
      <div
        className={`w-full transition-all duration-300 ease-out border border-gray-200 rounded-lg absolute mt-4 z-60 bg-white shadow-lg ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div
          className={`p-4 overflow-auto max-h-80 transition-all duration-200 ${
            isOpen
              ? "delay-75 opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          {children}
        </div>
        <div
          className={`py-4 mx-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4 transition-all duration-200 ${
            isOpen
              ? "delay-100 opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <Button
            type="button"
            className="bg-transparent! text-red-500! border-red-500! border! hover:bg-red-500! hover:text-white! transition-colors duration-300 w-full sm:w-auto"
            onClick={resetFilters}
          >
            Réinitialiser
          </Button>
          <Button
            type="button"
            className="bg-midnight-green! text-white! w-full sm:w-auto hover:bg-midnight-green/80!"
          >
            Appliquer les filtres
          </Button>
        </div>
      </div>
      {/* Transparent background when dropdown is open */}
      {isOpen &&
        createPortal(
          <div
            className="fixed top-0 left-0 w-full h-full bg-transparent z-50"
            onClick={() => setIsOpen(false)}
          ></div>,
          document.body
        )}
    </div>
  );
}
