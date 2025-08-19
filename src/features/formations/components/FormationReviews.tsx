"use client";

import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import FormationReview from "./FormationReview";
import { useEffect, useState } from "react";
import { Reviews } from "../types";

export default function FormationReviews({ reviews }: { reviews: Reviews[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [reviews?.length, index]);

  function handlePrevious() {
    setIndex(
      (prevIndex) => (prevIndex - 1 + reviews?.length) % reviews?.length
    );
  }

  function handleNext() {
    setIndex((prevIndex) => (prevIndex + 1) % reviews?.length);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Témoignages</h3>
        <div className="flex gap-4">
          <CircleArrowLeft
            size={32}
            onClick={handlePrevious}
            className="cursor-pointer hover:text-midnight-green transition-colors duration-200"
          />
          <CircleArrowRight
            size={32}
            onClick={handleNext}
            className="cursor-pointer hover:text-midnight-green transition-colors duration-200"
          />
        </div>
      </div>

      <FormationReview review={reviews[index]} key={index} />
    </div>
  );
}
