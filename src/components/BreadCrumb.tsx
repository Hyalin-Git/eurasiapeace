"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadCrumb({
  isBgDark = true,
  title,
}: {
  isBgDark?: boolean;
  title?: string;
}) {
  const pathname = usePathname();
  const breadcrumb = pathname.split("/").filter((item) => item !== "");

  return (
    <nav>
      <ul
        className={`flex items-center gap-2 text-sm *:flex *:items-center *:gap-2 ${
          isBgDark ? "[&_li]:text-white" : "[&_li]:text-text-primary"
        } `}
      >
        <li>
          <Link
            href="/"
            className={`flex items-center gap-2 ${
              isBgDark ? "hover:text-white/80" : "hover:text-text-primary/80"
            }`}
          >
            <Home size={16} />
            Accueil
          </Link>
          <ChevronRight size={14} />
        </li>
        {breadcrumb.map((item, index) => {
          const href = "/" + breadcrumb.slice(0, index + 1).join("/");
          const isLast = index === breadcrumb.length - 1;
          return (
            <li key={index}>
              {isLast && title ? (
                <Link
                  href={href}
                  className={`$ {
                    isBgDark
                      ? "hover:text-white/80"
                      : "hover:text-text-primary/80"
                  } max-w-[120px] lg:max-w-[200px] sm:max-w-[180px] truncate`}
                >
                  {title}
                </Link>
              ) : (
                <Link
                  href={href}
                  className={`$ {
                    isBgDark
                      ? "hover:text-white/80"
                      : "hover:text-text-primary/80"
                  } max-w-[120px] lg:max-w-[200px] sm:max-w-[180px] truncate`}
                >
                  {item.charAt(0).toUpperCase() +
                    item.slice(1).replace(/-/g, " ")}
                </Link>
              )}
              {!isLast && <ChevronRight size={14} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
