"use client";

export default function Category({
  category,
}: {
  category?: {
    slug: string;
    name: string;
  };
}) {
  if (!category?.name) return null;

  return (
    <span className="border border-gray-200 shadow-xs bg-background-primary text-text-primary text-sm rounded-sm px-2 py-[3px] font-[500]">
      {category?.name}
    </span>
  );
}
