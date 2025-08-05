import FilterItem from "@/components/filters/FiltersItem";
import { isEmpty } from "@/utils/isEmpty";

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
  return (
    <div className="flex flex-wrap gap-2">
      {!isEmpty(items) &&
        items.map((item, idx) => (
          <FilterItem
            key={idx}
            element={item}
            query={query}
            className="border border-gray-200 bg-white text-text-primary text-sm"
          />
        ))}
    </div>
  );
}
