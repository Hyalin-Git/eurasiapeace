"use server";
import { Links, NavigationItems } from "@/features/header/types";
import NavigationMenu from "./NavigationMenu";
import {
  getGeopoliticalWatchLinks,
  getFormationLinks,
  getExpertVoicesLinks,
  getPublicationsLinks,
} from "../server/db/navigations";

export default async function Navigations() {
  const [
    publicationsLinks,
    geopoliticalWatchLinks,
    formationLinks,
    expertVoicesLinks,
  ] = await Promise.all([
    getPublicationsLinks(),
    getGeopoliticalWatchLinks(),
    getFormationLinks(),
    getExpertVoicesLinks(),
  ]);

  const navigationItems: NavigationItems[] = [
    {
      label: "Publications",
      href: "/publications",

      items: [
        ...publicationsLinks?.data?.map((elt: Links) => ({
          name: elt?.name,
          slug: `/publications?category=${elt?.slug}`,
        })),
      ],
    },
    {
      label: "Veilles géopolitiques",
      href: "/veilles-geopolitiques",
      items: [
        ...geopoliticalWatchLinks?.data?.map((elt: Links) => ({
          name: elt?.name,
          slug: `/veilles-geopolitiques?category=${elt?.slug}`,
        })),
      ],
    },
    {
      label: "La voix des experts",
      href: "/la-voix-des-experts",
      items: [
        ...expertVoicesLinks?.data?.map((elt: Links) => ({
          name: elt?.name,
          slug: `/la-voix-des-experts?category=${elt?.slug}`,
        })),
      ],
    },
    {
      label: "Formations",
      href: "/formations",
      items: [
        ...formationLinks?.data?.map((elt: Links) => ({
          name: elt?.name,
          slug: `/formations?category=${elt?.slug}`,
        })),
      ],
    },
    {
      label: "En savoir plus",
      href: "/qui-sommes-nous",
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
