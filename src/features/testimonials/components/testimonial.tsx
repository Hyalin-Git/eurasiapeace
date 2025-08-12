import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonial({
  stars,
  content,
  user,
}: {
  stars: number;
  content: string;
  user: { image: string; firstname: string; lastname: string };
}) {
  return (
    <div className="flex justify-between flex-col gap-4 w-85 h-85 bg-white rounded-lg p-4 pb-0">
      <div className="flex items-center gap-1 bg-midnight-green/30 rounded-lg p-1 px-2 w-fit">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`text-midnight-green ${
              stars >= index + 1 ? "fill-midnight-green" : ""
            }`}
          />
        ))}
      </div>
      <p className="text-sm/7 flex-1">{content}</p>
      <div className="flex items-center gap-2 pt-4 border-t border-dashed border-midnight-green">
        <div className="relative min-w-15 min-h-15 flex items-center justify-center">
          <Image
            src="/ellipse-user.svg"
            alt="avatar"
            width={60}
            height={60}
            className="absolute w-auto h-auto"
          />
          <Image
            src={user.image}
            alt="avatar"
            width={40}
            height={40}
            className="absolute top-0.5 rounded-full object-cover min-w-12 min-h-12 max-w-12 max-h-12"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">
            {user.firstname} {user.lastname}
          </p>
        </div>
      </div>
    </div>
  );
}
