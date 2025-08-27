"use client";

import Button from "@/ui/Button";
import { Funnel, ChevronDown, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { createPortal } from "react-dom";
import { Filters as FiltersInterface } from "@/types";
import {
  FiltersContext,
  SelectedFiltersMap,
} from "../../context/FiltersContext";

export default function Filters({
  filters,
  children,
}: {
  filters?: FiltersInterface;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const queries = useMemo(() => new URLSearchParams(params), [params]);
  const [isOpen, setIsOpen] = useState(false);

  const initialSelected = useMemo<SelectedFiltersMap>(() => {
    const map: SelectedFiltersMap = {};
    const keys = filters ? Object.keys(filters) : ["category", "tag"];
    keys.forEach((key) => {
      const values = queries.get(key)?.split(",").filter(Boolean) || [];
      if (values.length) map[key] = values;
    });
    return map;
  }, [queries, filters]);

  const [selected, setSelected] = useState<SelectedFiltersMap>(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  // Display count only for filters that are actually applied (from URL params)
  const appliedCount = useMemo(() => {
    return Object.values(initialSelected).reduce((acc, arr) => {
      const len = Array.isArray(arr) ? arr.length : 0;
      return acc + len;
    }, 0);
  }, [initialSelected]);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function resetFilters() {
    setSelected({});
    const page = queries.get("page");
    if (page) router.push(`${pathname}?page=${page}`);
    else router.push(pathname);
    setIsOpen(false);
  }

  function applyFilters() {
    const newParams = new URLSearchParams(queries.toString());

    newParams.set("page", "1");

    const keys = filters ? Object.keys(filters) : ["category", "tag"];

    keys.forEach((key) => newParams.delete(key));

    Object.entries(selected).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length) {
        newParams.set(key, values.join(","));
      }
    });

    router.push(`${pathname}?${newParams.toString()}`);

    setIsOpen(false);
  }

  return (
    <div className="mb-8 select-none relative">
      <div className="flex justify-between items-center rounded-t-lg cursor-pointer transition-[background-color] duration-300 gap-4">
        <div
          className="flex items-center gap-2 border border-gray-200 rounded-lg p-3 cursor-pointer"
          onClick={handleOpen}
        >
          <span className="flex items-center gap-2 text-lg text-text-primary font-semibold">
            <Funnel size={17} className="text-midnight-green" />
            Filtres
          </span>
          {appliedCount > 0 && (
            <span className="relative">
              <span className="text-white rounded-full bg-midnight-green w-6 h-6 flex items-center justify-center text-sm font-medium">
                {appliedCount}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetFilters();
                }}
                className="absolute top-[-7px] right-[-9px] w-4 h-4 bg-red-100 rounded-full duration-200 shadow-sm flex items-center justify-center cursor-pointer border border-gray-200"
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

      <div
        className={`p-6 w-full transition-all duration-300 ease-out border border-gray-200 rounded-lg absolute mt-4 z-60 bg-white shadow-lg ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <FiltersContext.Provider
          value={{
            selected,
            toggle: (query, slug) => {
              setSelected((prev) => {
                const current = prev[query] || [];
                const exists = current.includes(slug);
                const next = exists
                  ? current.filter((v) => v !== slug)
                  : [...current, slug];
                const updated: SelectedFiltersMap = { ...prev };
                if (next.length) updated[query] = next;
                else delete updated[query];
                return updated;
              });
            },
          }}
        >
          <div
            className={`overflow-auto max-h-80 pb-4 transition-all duration-200 ${
              isOpen
                ? "delay-75 opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            {children}
          </div>
        </FiltersContext.Provider>
        <div
          className={`pt-5  border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4 transition-all duration-200 ${
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
            onClick={applyFilters}
          >
            Appliquer les filtres
          </Button>
        </div>
      </div>
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
