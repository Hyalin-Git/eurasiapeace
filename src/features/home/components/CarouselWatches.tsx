"use server";
import { getGeopoliticalWatches } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import CarouselWatchesItem from "@/features/home/components/CarouselWatchesItem";

export default async function CarouselWatches() {
  const { data: geopoliticalWatches } = await getGeopoliticalWatches(12);

  // Créer plus de copies pour un scroll plus fluide
  const extendedWatches = [
    ...geopoliticalWatches,
    ...geopoliticalWatches,
    ...geopoliticalWatches,
  ];

  return (
    <div className="bg-headband mb-[40px] py-6 overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex w-fit carousel-tracker">
          {extendedWatches.map((watch, index) => (
            <div
              key={`${watch?.id}-${index}`}
              className="mr-[2rem] min-w-fit flex-shrink-0"
            >
              <CarouselWatchesItem watch={watch} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
