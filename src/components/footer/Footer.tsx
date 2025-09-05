"use server";

import Link from "next/link";
import { Globe } from "lucide-react";
import Separator from "@/ui/Separator";
import SocialMedia from "@/ui/SocialMedia";

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
                <Link href="/la-voix-des-experts">La voix des experts</Link>
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
                  <SocialMedia />
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
