"use client";

import FilterItem from "@/components/filters/FiltersItem";
import { isEmpty } from "@/utils/isEmpty";
import { useState } from "react";

export default function FiltersItems({
  items,
  query,
}: {
  items: {
    name: string;
    slug: string;
  }[];
  query: string;
}) {
  const [index, setIndex] = useState(20);
  const slicedItems = items.slice(0, index);

  function handleShowMore() {
    setIndex((prevIndex) => prevIndex + 20);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {!isEmpty(slicedItems) &&
        slicedItems.map((item, idx) => (
          <FilterItem
            key={idx}
            element={item}
            query={query}
            className="border border-gray-200 bg-white text-text-primary text-sm"
          />
        ))}

      {items?.length > slicedItems?.length && (
        <button
          onClick={handleShowMore}
          className="rounded cursor-pointer border border-midnight-green bg-midnight-green/10 px-4 py-1 text-sm text-midnight-green hover:bg-gray-200"
        >
          Afficher plus...
        </button>
      )}
    </div>
  );
}
