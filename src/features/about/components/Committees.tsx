"use server";

import Button from "@/ui/Button";
import { ArrowRight, Edit, Microscope } from "lucide-react";
import Link from "next/link";

const comitees = [
  {
    icon: <Edit size={34} />,
    title: "Comité d'édition",
    description:
      "Chargé de relire, structurer et harmoniser nos contenus, le comité d'édition veille à ce que chaque publication soit claire, cohérente et fidèle à notre ligne éditoriale.",
    link: "/qui-sommes-nous/comite-edition",
  },
  {
    icon: <Microscope size={34} />,
    title: "Comité scientifique",
    description:
      "Composé d'experts et de chercheurs, le comité scientifique garantit la solidité méthodologique et la pertinence des données qui soutiennent nos travaux.",
    link: "/qui-sommes-nous/comite-scientifique",
  },
];

export default async function Committees() {
  return (
    <section className="text-left mb-20 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
        Nos comités
      </h2>
      <div className="w-[30%] min-w-55 h-0.5 bg-gradient-to-r from-midnight-green to-btn-force-blue my-6"></div>
      <p className="text-text-secondary max-w-2xl text-lg">
        Découvrez les équipes d&apos;experts qui garantissent l&apos;excellence
        de nos travaux et publications
      </p>

      {/* Comitees */}
      <div className="flex flex-col md:flex-row justify-between gap-8 mt-8">
        {comitees.map((comite) => (
          <div
            key={comite.title}
            className="group w-full relative text-left bg-white border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Card decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-midnight-green/20 to-transparent rounded-bl-full group-hover:w-42 group-hover:h-42 transition-all duration-300"></div>

            {/* Card Header */}
            <div className="flex flex-col gap-4">
              <div className="w-fit p-4 bg-midnight-green text-white rounded-2xl group-hover:scale-105 transition-transform duration-300">
                {comite.icon}
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                <Link
                  className="before:absolute before:z-1 before:content-[''] before:top-0 before:left-0 before:right-0 before:bottom-0"
                  href={comite.link}
                >
                  {comite.title}
                </Link>
              </h3>
            </div>

            {/* Card content */}
            <div className="max-w-sm">
              <p className="text-text-secondary mb-4">{comite.description}</p>
            </div>

            {/* Card Footer */}
            <div className="absolute right-0 bottom-0 ">
              <Button
                type="button"
                className="rounded-bl-none! rounded-tr-none rounded-tl-2xl"
              >
                En savoir plus{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
