"use client";
import Image from "next/image";

export default function Banner({
  featuredImage,
  featuredImageAlt,
}: {
  featuredImage: string;
  featuredImageAlt: string;
}) {
  if (!featuredImage) return null;

  return (
    <div>
      <Image
        src={featuredImage}
        alt={featuredImageAlt}
        width={800}
        height={400}
        quality={95}
        className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
      />
      <p className="text-sm text-gray-500 mt-2 text-center italic">
        {featuredImageAlt}
      </p>
    </div>
  );
}
