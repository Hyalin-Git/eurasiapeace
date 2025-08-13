import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonial({
  testimonial,
}: {
  testimonial: {
    stars: number;
    avis: string;
    fullName: string;
    profilPicture: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  };
}) {
  return (
    <div className="flex justify-between flex-col gap-4 w-85 h-85 bg-white rounded-lg p-4 pb-0">
      <div className="flex items-center gap-1 bg-midnight-green/30 rounded-lg p-1 px-2 w-fit">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`text-midnight-green ${
              testimonial.stars >= index + 1 ? "fill-midnight-green" : ""
            }`}
          />
        ))}
      </div>
      <p className="text-sm/7 flex-1">{testimonial.avis}</p>
      <div className="flex items-center gap-2 pt-4 border-t border-solid border-gray-200">
        <div className="relative min-w-15 min-h-15 flex items-center justify-center">
          <Image
            src="/ellipse-user.svg"
            alt="avatar"
            width={60}
            height={60}
            className="absolute w-auto h-auto"
          />
          <Image
            src={
              testimonial.profilPicture.node.sourceUrl || "/default-avatar.webp"
            }
            alt={
              testimonial.profilPicture.node.altText ||
              "Photo de profil d'un témoignage"
            }
            width={40}
            height={40}
            quality={100}
            className="absolute top-0.5 rounded-full object-cover min-w-12 min-h-12 max-w-12 max-h-12"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{testimonial.fullName}</p>
        </div>
      </div>
    </div>
  );
}
