"use client";
import { useEffect, useState } from "react";
import { useFiltersContext } from "../../context/FiltersContext";

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
  const { selected, toggle } = useFiltersContext();

  const handleClick = () => {
    toggle(query, element.slug);
  };

  useEffect(() => {
    const values = selected[query] || [];
    setIsSelected(values.includes(element.slug));
  }, [selected, query, element.slug]);

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
