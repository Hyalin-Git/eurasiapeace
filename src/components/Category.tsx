"use client";

import Link from "next/link";

export default function Category({
  category,
  type = "posts",
}: {
  category?: {
    slug: string;
    name: string;
  };
  type?: "posts" | "geopolitics" | "cultures" | "formations" | string;
}) {
  if (!category?.name) return null;

  // Adjust the link based on the type of category
  function getCategoryLink() {
    switch (type) {
      case "post":
        return `/publications?category=${category?.slug}`;
      case "veille-geopolitique":
        return `/veilles-geopolitiques?category=${category?.slug}`;
      case "culture":
        return `/cultures?category=${category?.slug}`;
      case "formation":
        return `/formations?category=${category?.slug}`;
      default:
        return `?category=${category?.slug}`;
    }
  }

  return (
    <Link
      href={getCategoryLink()}
      className="border border-gray-200 shadow-xs bg-background-primary text-text-primary text-sm rounded-sm px-2 py-[3px] font-[500] hover:shadow-sm transition-shadow duration-300"
    >
      {category?.name}
    </Link>
  );
}
