"use server";

import { getGeopoliticalWatches } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import moment from "moment";
import Link from "next/link";

export default async function GeoWatchesCarousel() {
  const { data: geopoliticalWatches } = await getGeopoliticalWatches(12);

  // Créer plus de copies pour un scroll plus fluide
  const extendedWatches = [
    ...geopoliticalWatches,
    ...geopoliticalWatches,
    ...geopoliticalWatches,
  ];

  return (
    <div className="bg-headband py-6 overflow-hidden hidden md:block">
      <div className="w-full overflow-hidden">
        <div className="flex w-fit carousel-tracker">
          {extendedWatches.map((watch, index) => (
            <div
              key={`${watch?.id}-${index}`}
              className="mr-[2rem] min-w-fit flex-shrink-0"
            >
              <div
                key={watch?.id}
                className="flex flex-col h-full text-xs gap-1 px-4 max-w-90"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-btn-gold rounded-sm text-xs font-[600] text-text-primary">
                    {watch?.typeDeVeilles?.nodes[0]?.name}
                  </span>
                  <span className="text-white/70">
                    {moment(watch?.date).format("DD MMM YYYY")}
                  </span>
                </div>
                <Link
                  href={`/veilles-geopolitiques/${watch?.slug}`}
                  className="text-white text-sm underline hover:text-white/80"
                >
                  {watch?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
