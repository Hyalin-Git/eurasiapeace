"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination({
  pageInfo,
}: {
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    endCursor: string;
    total: number;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  const { total } = pageInfo;
  const totalPages = Math.ceil(total / 12);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const sliceLogic = currentPage - 3 < 0 ? 0 : currentPage - 3;
  const displayPages = pages.slice(sliceLogic, sliceLogic + 5);

  function handlePage(page: number) {
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePrevious() {
    if (!hasPreviousPage) return;

    params.set("page", (currentPage - 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleNext() {
    if (!hasNextPage) return;

    params.set("page", (currentPage + 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <div
        className={`text-btn-force-blue flex items-center gap-2 p-2 cursor-pointer ${!hasPreviousPage
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-btn-force-blue/10 transition-all duration-200 ease-in-out"
          }`}
        onClick={handlePrevious}
      >
        <ChevronLeft size={20} />
        <p className="hidden sm:block">Retour</p>
      </div>
      {displayPages.map((page) => (
        <div
          key={page}
          className={`py-2 px-4 rounded-sm cursor-pointer ${currentPage === page
            ? "bg-btn-force-blue text-white"
            : "bg-btn-force-blue/10"
            }`}
          onClick={() => handlePage(page)}
        >
          {page}
        </div>
      ))}
      <div
        className={`text-btn-force-blue flex items-center gap-1 p-2 cursor-pointer ${!hasNextPage
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-btn-force-blue/10 transition-all duration-200 ease-in-out"
          }`}
        onClick={handleNext}
      >
        <p className="hidden sm:block">Suivant</p>
        <ChevronRight size={20} />
      </div>
    </div>
  );
}
