import moment from "moment";
import Link from "next/link";

interface WatchItemProps {
  watch: {
    id: string;
    slug: string;
    title: string;
    date: string;
    typeDeVeilles: {
      nodes: Array<{
        name: string;
      }>;
    };
  };
}

export default function CarouselWatchesItem({ watch }: WatchItemProps) {
  const hasCategory = watch?.typeDeVeilles?.nodes[0]?.name;

  return (
    <>
      {hasCategory && (
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
      )}
    </>
  );
}
