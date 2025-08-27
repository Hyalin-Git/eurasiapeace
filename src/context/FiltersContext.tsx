"use client";

import { createContext, useContext } from "react";

export type SelectedFiltersMap = Record<string, string[]>;

type FiltersContextValue = {
  selected: SelectedFiltersMap;
  toggle: (query: string, slug: string) => void;
};

export const FiltersContext = createContext<FiltersContextValue | null>(null);

export function useFiltersContext(): FiltersContextValue {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error(
      "useFiltersContext must be used within a FiltersContext.Provider"
    );
  }
  return ctx;
}
