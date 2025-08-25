import Activities from "@/features/about/components/Activities";
import Committees from "@/features/about/components/Committees";
import JoinUs from "@/features/about/components/JoinUs";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qui Sommes-Nous - EurasiaPeace",
  description:
    "Découvrez EurasiaPeace, Centre de Réflexion et de Prospective sur la Paix en Eurasie. Think-tank interdisciplinaire menant des activités de recherche, formation, conseils et publication sur la résolution de conflits internationaux.",
  keywords: [
    "EurasiaPeace",
    "qui sommes nous",
    "à propos",
    "think-tank",
    "centre de réflexion",
    "prospective",
    "paix en Eurasie",
    "recherche géopolitique",
    "résolution de conflits",
    "construction de la paix",
    "relations internationales",
    "anthropologie",
    "géopolitique",
    "sciences politiques",
    "études des frontières",
    "formation géopolitique",
    "conseils stratégiques",
    "publications",
    "interdisciplinaire",
    "fondateur",
    "expertise Eurasie",
  ],
  openGraph: {
    title: "Qui Sommes-Nous - EurasiaPeace",
    description:
      "Think-tank innovant spécialisé dans la paix en Eurasie. Recherche interdisciplinaire, formation et conseils sur la résolution de conflits internationaux.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "EurasiaPeace - Centre de Réflexion sur la Paix en Eurasie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qui Sommes-Nous - EurasiaPeace",
    description:
      "Think-tank interdisciplinaire dédié à la paix en Eurasie. Recherche, formation et expertise géopolitique.",
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/morgan.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function About() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-headband py-12">
        <div className="container px-4">
          <div className="text-center">
            <h1 className="text-white font-playfair font-bold mb-4">
              À propos d&apos;EurasiaPeace
            </h1>
            <p className="text-lg md:text-xl text-white">
              Centre de Réflexion et de Prospective sur la Paix en Eurasie
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-6xl px-4 py-12">
        {/* Que fait EurasiaPeace Section */}
        <section className="mb-16">
          <h2 className="font-playfair font-bold text-text-primary mb-8 text-center">
            Que fait EurasiaPeace ?
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 text-text-secondary leading-relaxed">
            <p className="text-lg font-semibold text-text-primary">
              EurasiaPeace est le Centre de Réflexion et de Prospective sur la
              Paix en Eurasie qui mène des activités de recherche, de formation,
              de conseils et de publication.
            </p>

            <p>
              Il s&apos;agit donc en premier lieu d&apos;un think-tank innovant
              et ambitieux dont l&apos;objectif est de dégager de nouveaux
              paradigmes de pensée sur la résolution de conflits internationaux
              et la construction de la paix en partant des expériences de la
              zone géopolitique eurasiatique.
            </p>

            <p>
              Son projet de recherche global interdisciplinaire convoque donc
              plusieurs disciplines : anthropologie, géopolitique, économie,
              droit, histoire, études des frontières et sciences politiques.
            </p>

            <p>
              Le projet tente également de croiser ces savoirs académiques avec
              les savoirs empiriques des professionnels qui peuvent exercer dans
              les secteurs de l&apos;humanitaire, de la gestion de crise, de la
              politique, de la défense et de la sécurité, de l&apos;écologie, de
              l&apos;art et de la culture. Il peut également s&apos;agir de
              leaders communautaires et religieux, d&apos;acteurs du monde
              associatif et des droits humains.
            </p>

            <p>
              EurasiaPeace se propose donc de mettre en lumière des approches et
              des actions diverses en matière de résolution de conflits tout en
              favorisant un décentrement des regards enchâssés dans des rapports
              de pouvoir et des intérêts particuliers servis par des dynamiques
              conflictuelles.
            </p>

            <p>
              Son cadre théorique promeut une approche interactionniste, au sens
              socio-anthropologique, des relations internationales. Il se situe
              au croisement de l&apos;anthropologie, incluant l&apos;étude des
              frontières, et de la géopolitique considérée comme une branche à
              part entière de la politologie.
            </p>
          </div>
        </section>

        <Committees />

        <Activities />

        {/* Le Fondateur Section */}
        <section className="mb-16">
          <h2 className="font-playfair font-bold text-text-primary mb-8 text-center">
            Le Fondateur
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image et infos */}
            <div className="space-y-6">
              <div className="relative w-48 h-64 mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                {/* Placeholder pour l'image du fondateur */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <Image
                    src="/morgan.jpg"
                    alt="Fondateur"
                    fill
                    className="w-full h-full object-cover object-[65%_50%]"
                  />
                </div>
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-xl font-playfair font-bold text-text-primary">
                  Fondateur d&apos;EurasiaPeace
                </h3>
                <div className="space-y-2 text-text-secondary">
                  <p>Expertise : Géopolitique de l&apos;Eurasie</p>
                  <p>Contact : contact@eurasiapeace.org</p>
                  <p>Téléphone : +33 06 37 36 36 99</p>
                  <a
                    href="https://www.linkedin.com/in/morgan-caillet-32481448/"
                    className="flex items-center gap-2 max-w-fit mx-auto"
                  >
                    <svg
                      className="w-4 h-4 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Témoignage */}
            <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-playfair font-bold text-text-primary mb-6">
                Vision du Fondateur
              </h3>

              <blockquote className="text-text-secondary space-y-4 leading-relaxed">
                <p className="italic text-lg">
                  &quot;EurasiaPeace naît de la conviction que la paix en
                  Eurasie est un enjeu fondamental pour l&apos;avenir de notre
                  monde interconnecté.&quot;
                </p>

                <p>
                  À travers nos activités de recherche, d&apos;analyse et de
                  formation, nous nous efforçons de construire des ponts de
                  compréhension entre l&apos;Europe et l&apos;Asie. Notre
                  approche se base sur une expertise géopolitique rigoureuse et
                  un dialogue interculturel respectueux.
                </p>

                <p>
                  Que fait EurasiaPeace ? Nous proposons des analyses
                  géopolitiques, des formations spécialisées, des conférences et
                  webinaires, ainsi que des publications pour éclairer les
                  enjeux complexes de cette région stratégique.
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        <JoinUs />
      </div>
    </div>
  );
}
