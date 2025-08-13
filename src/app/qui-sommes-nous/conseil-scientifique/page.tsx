"use server";

import CommitteMembers from "@/features/about/components/CommitteeMembers";
import { CommitteesMemberSkeletons } from "@/features/about/components/CommitteeMemberSkeleton";
import { Suspense } from "react";

export default async function ConseilScientifique() {
  return (
    <div>
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
        <Suspense fallback={<CommitteesMemberSkeletons count={6} />}>
          <CommitteMembers committeeType="Conseil scientifique" />
        </Suspense>
      </div>
    </div>
  );
}
