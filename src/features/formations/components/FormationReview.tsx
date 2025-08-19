import { Star } from "lucide-react";
import { Reviews } from "../types";

export default function FormationReview({ review }: { review: Reviews }) {
  const note = review?.note[0] || 0;
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs select-none animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="block font-bold">{review?.fullName}</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              size={16}
              className={`text-btn-gold ${
                (note as number) >= idx + 1 ? "fill-btn-gold" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-6">
        <i>&quot;{review?.review}&quot;</i>
      </p>
    </div>
  );
}
