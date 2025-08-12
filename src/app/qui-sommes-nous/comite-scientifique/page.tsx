"use server";

import CommitteMembers from "@/features/about/components/CommitteeMembers";
import Link from "next/link";

export default async function ComiteScientifique() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="bg-headband py-12">
        <div className="container px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
              Comité Scientifique
            </h1>
            <p className="text-lg md:text-xl text-white">
              Les garants de la rigueur académique d&apos;EurasiaPeace
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-6xl px-4 py-12">
        {/* Description */}
        {/* <section className="mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-text-secondary leading-relaxed">
              Le comité scientifique d&apos;EurasiaPeace réunit des chercheurs
              et experts internationaux qui garantissent la rigueur académique
              de nos travaux de recherche. Ils orientent nos axes de recherche
              et valident la méthodologie de nos analyses prospectives sur la
              paix en Eurasie.
            </p>
          </div>
        </section> */}

        <CommitteMembers />
      </div>
    </main>
  );
}
