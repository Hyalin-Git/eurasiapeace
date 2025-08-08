"use server";
import { Links, NavigationItems } from "@/features/header/types";
import NavigationMenu from "./NavigationMenu";
import {
  getCultureLinks,
  getFormationLinks,
  getGeopoliticalWatchLinks,
} from "../server/db/navigations";

export default async function Navigations() {
  const [geopoliticalWatchLinks, FormationLinks, CultureLinks] =
    await Promise.all([
      getGeopoliticalWatchLinks(),
      getFormationLinks(),
      getCultureLinks(),
    ]);

  const navigationItems: NavigationItems[] = [
    {
      label: "Publications",
      href: "/publications",
      items: [
        {
          name: "Notes d'analyse",
          slug: "/publications?category=notes-analyse",
        },
        {
          name: "Dossiers thématiques",
          slug: "/publications?category=dossiers-thematiques",
        },
        {
          name: "Fiches de renseignement",
          slug: "/publications?category=fiches-de-renseignement",
        },
        {
          name: "Rapports de renseignement",
          slug: "/publications?category=rapports-de-renseignement",
        },
      ],
    },
    {
      label: "Veilles géopolitiques",
      href: "/veilles-geopolitiques",
      items: geopoliticalWatchLinks?.data?.map((elt: Links) => ({
        name: elt?.name,
        slug: `/veilles-geopolitiques?category=${elt?.slug}`,
      })),
    },
    {
      label: "Cultures",
      href: "/cultures",
      items: CultureLinks?.data?.map((elt: Links) => ({
        name: elt?.name,
        slug: `/cultures?category=${elt?.slug}`,
      })),
    },
    {
      label: "Formations",
      href: "/formations",
      items: FormationLinks?.data?.map((elt: Links) => ({
        name: elt?.name,
        slug: `/formations?category=${elt?.slug}`,
      })),
    },
    {
      label: "En savoir plus",
      href: "",
      items: [
        {
          name: "Conseils",
          slug: "/conseils",
        },
        {
          name: "Contactez-nous",
          slug: "/contact",
        },
        {
          name: "Qui sommes-nous ?",
          slug: "/qui-sommes-nous",
        },
      ],
    },
  ];

  return <NavigationMenu navigationItems={navigationItems} />;
}
