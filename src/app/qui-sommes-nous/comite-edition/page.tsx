"use server";

import CommitteMembers from "@/features/about/components/CommitteeMembers";
import Link from "next/link";

export default async function ComiteEdition() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="bg-headband py-12">
        <div className="container px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl text-white font-playfair font-bold mb-4">
              Comité d&apos;Édition
            </h1>
            <p className="text-lg md:text-xl text-white">
              Les garants de l&apos;excellence éditoriale d&apos;EurasiaPeace
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
              Le comité d&apos;édition d&apos;EurasiaPeace rassemble des experts
              reconnus qui supervisent la qualité et la cohérence de nos
              publications. Ils veillent à l&apos;excellence éditoriale de nos
              analyses géopolitiques et garantissent la rigueur de nos
              recherches académiques.
            </p>
          </div>
        </section> */}

        <CommitteMembers />
      </div>
    </main>
  );
}
