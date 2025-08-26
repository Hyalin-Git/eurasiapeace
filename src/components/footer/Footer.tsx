"use server";

import Link from "next/link";
import { Globe } from "lucide-react";
import Separator from "@/ui/Separator";

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-third py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-lg">Eurasia Peace</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Centre de réflexion spécialisé en géopolitique eurasiatique, dédié
              à la promotion de la paix et de la compréhension entre
              l&apos;Europe et l&apos;Asie.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigation</h3>
            <ul className="space-y-2 text-sm [&>li>a]:hover:underline">
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/conseils">Conseils</Link>
              </li>
              <li>
                <Link href="/abonnements">Abonnements</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Articles</h3>
            <ul className="space-y-2 text-sm [&>li>a]:hover:underline">
              <li>
                <Link href="/publications">Publications</Link>
              </li>
              <li>
                <Link href="/veilles-geopolitiques">Veilles géopolitiques</Link>
              </li>
              <li>
                <Link href="/cultures">Cultures</Link>
              </li>
              <li>
                <Link href="/formations">Formations</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Soutenir</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faire-un-don" className="hover:underline">
                  Faire un don
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@eurasiapeace.org"
                  className="hover:underline"
                >
                  contact@eurasiapeace.org
                </a>
              </li>
              <li>
                <div className="flex space-x-4 pt-2">
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* separator */}
        <Separator className="my-8!" />

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Eurasia Peace. Tous droits réservés.
          </p>
          <div className="flex flex-col space-x-6 mt-4 md:mt-0 lg:flex-row">
            <Link
              href="/mentions-legales"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/conditions-generales-de-vente"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Conditions générales d&apos;utilisation et de vente
            </Link>
            <Link
              href="/charte-deontologique"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Charte déontologique
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
