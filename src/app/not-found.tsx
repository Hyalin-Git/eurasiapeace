import Button from "@/ui/Button";
import { HomeIcon, Newspaper } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light-primary flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-8">
          La ressource demandée n&apos;a pas été trouvée.
        </p>
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
