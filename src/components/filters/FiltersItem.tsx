"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FiltersItem({
  element,
  query,
  className,
}: {
  element: {
    name: string;
    slug: string;
  };
  query: string;
  className?: string;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const currentParams = params.get(query)?.split(",").filter(Boolean) || [];

  // Garder les anciennes régions dans les paramètres quand on en ajoute une nouvelle,
  // quand on clique sur une région déjà sélectionnée la retirer de l'url
  const handleClick = () => {
    if (isSelected) {
      // Retirer la région de la liste
      const updatedParams = currentParams.filter(
        (param) => param !== element?.slug
      );

      if (updatedParams.length === 0) {
        // Si plus aucune région, supprimer complètement le paramètre
        params.delete(query);
      } else {
        // Sinon, mettre à jour avec les régions restantes
        params.set("page", "1");
        params.set(query, updatedParams.join(","));
      }
    } else {
      // Ajouter la région à la liste
      params.set("page", "1");
      const updatedParams = [...currentParams, element?.slug];
      params.set(query, updatedParams.join(","));
    }

    // Naviguer vers la nouvelle URL
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsSelected(currentParams.includes(element?.slug));
  }, [searchParams]);

  return (
    <div
      className={`rounded-sm px-3 py-1 font-[500] cursor-pointer hover:bg-btn-force-blue/15 transition-all duration-200 ease-in-out ${className} ${
        isSelected
          ? "bg-btn-force-blue! text-white hover:bg-btn-force-blue/80!"
          : ""
      }`}
      onClick={handleClick}
    >
      {element?.name}
    </div>
  );
}
