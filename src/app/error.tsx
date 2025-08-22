"use client"; // Error boundaries must be Client Components

import Button from "@/ui/Button";
import { HomeIcon, Newspaper } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-light-primary flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-bold text-primary mb-4">500</h1>
        <h2 className="font-semibold text-gray-800 mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-gray-600 mb-8">Veuillez réessayer plus tard.</p>
        <div className="flex justify-center items-center flex-col sm:flex-row gap-4 w-full">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              type="button"
              className="w-full sm:max-w-56 min-w-56 hover:bg-blue-600 font-semibold transition-colors duration-300"
            >
              <HomeIcon size={20} />
              Retourner à l&apos;accueil
            </Button>
          </Link>

          <Link href="/publications" className="w-full sm:w-auto">
            <Button
              type="button"
              className="w-full sm:max-w-56 min-w-56 hover:bg-blue-600 font-semibold transition-colors duration-300"
            >
              <Newspaper size={20} />
              Voir nos publications
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
