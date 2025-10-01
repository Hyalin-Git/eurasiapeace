"use server";

import Section from "@/components/Section";
import LinkButton from "@/ui/LinkButton";
import Posts from "@/features/posts/components/Posts";
import { Suspense } from "react";
import GeoWatches from "@/features/geopoliticalWatches/components/GeoWatches";
import { Formations } from "@/features/formations/components/Formations";
import ServicesCards from "@/components/cards/ServicesCards";
import { BookOpen, Gem, GraduationCap } from "lucide-react";
import {
  PostSkeleton,
  PostsSkeletons,
} from "@/features/posts/components/PostsSkeletons";
import { GeoWatchesSkeletons } from "@/features/geopoliticalWatches/components/GeoWatchesSkeletons";
import { FormationsSkeletons } from "@/features/formations/components/FormationSkeletons";
import GeoWatchesCarousel from "@/features/geopoliticalWatches/components/GeoWatchesCarousel";
import GeoWatchesCarouselSkeleton from "@/features/geopoliticalWatches/components/GeoWatchesCarouselSkeleton";
import Newsletter from "@/features/newsletter/components/Newsletter";
import HeroGeoWatch from "@/features/geopoliticalWatches/components/HeroGeoWatch";

const servicesData = [
  {
    id: 1,
    icon: (
      <BookOpen
        className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-purple/40`}
      />
    ),
    title: "Publications",
    description:
      "Production intellectuelle de notre think-tank pour alimenter votre réflexion stratégique et développer votre connaissance de l'espace eurasiatique.",
    button: {
      label: `Lire nos publications`,
    },
    href: "/publications",
    className: {
      background: "bg-btn-purple/5",
      backgroundHover: "hover:bg-btn-purple/8!",
      button: "bg-btn-purple!",
      iconBackground: "from-btn-purple/40",
    },
  },
  {
    id: 2,
    icon: (
      <Gem
        className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-gold/40`}
      />
    ),
    title: "Conseils",
    description:
      "Analyses précises et regards externes rigoureux pour vous accompagner dans vos prises de décisions à court, moyen et long terme.",
    button: {
      label: `Découvrir ce service`,
    },
    href: "/conseils",
    className: {
      background: "bg-btn-gold/5",
      backgroundHover: "hover:bg-btn-gold/8!",
      iconBackground: "from-btn-gold/40",
      button: "bg-btn-gold!",
    },
  },
  {
    id: 3,
    icon: (
      <GraduationCap
        className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-force-blue/40`}
      />
    ),
    title: "Formations",
    description:
      "Modules sur mesure avec des formateurs spécialistes pour développer votre maîtrise dans des domaines de compétences prisés.",
    button: {
      label: `Découvrir ce service`,
    },
    href: "/formations",
    className: {
      background: "bg-btn-force-blue/5",
      backgroundHover: "hover:bg-btn-force-blue/8!",
      iconBackground: "from-btn-force-blue/40",
      button: "bg-btn-force-blue!",
    },
  },
];

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<GeoWatchesCarouselSkeleton />}>
        <GeoWatchesCarousel />
      </Suspense>

      <div className="container mt-[40px] mb-12">
        {/* Hero Section */}
        <div className="flex gap-10 lg:flex-row flex-col">
          <div className="w-full lg:w-1/2 mx-auto">
            <Suspense fallback={<PostSkeleton />}>
              <HeroGeoWatch />
            </Suspense>
          </div>
          <div className="w-full lg:w-1/2 mx-auto">
            <ServicesCards servicesData={servicesData} />
          </div>
        </div>

        {/* Latest Posts */}
        <Section
          title="Dernières publications"
          description="Restez informés des évenements, analyses et développements récents"
        >
          <Suspense fallback={<PostsSkeletons count={3} />}>
            <Posts />
          </Suspense>
          <LinkButton
            href="/publications"
            label="Voir toutes les publications"
            className="mt-10"
          />
        </Section>

        {/* Geopolitical Watches */}
        <Section
          title="L'actualité géopolitique décryptée"
          description="Éclairage expert sur les mouvements géopolitiques majeurs"
          className="[&_p]:max-w-none [&>div>div]:justify-center text-center"
        >
          <Suspense fallback={<GeoWatchesSkeletons count={4} />}>
            <GeoWatches offset={1} numberOfWatches={4} />
          </Suspense>
          <LinkButton
            href="/veilles-geopolitiques"
            label="Explorer nos veilles géopolitiques"
            className="mt-10"
          />
        </Section>

        {/* Formations */}
        <Section
          title="Nos formations"
          description="Formations expertes pour approfondir vos connaissances géopolitiques et stratégiques"
          className="mb-12"
        >
          <Suspense fallback={<FormationsSkeletons count={2} />}>
            <Formations />
          </Suspense>
          <LinkButton
            href="/formations"
            label="Découvrir nos formations"
            className="mt-10"
          />
        </Section>

        <Newsletter />
      </div>
    </div>
  );
}
