import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { ElementProps } from "@/components/cards/types";

export default function CardRow({ element }: { element: ElementProps }) {
  const featuredImage = element?.featuredImage?.node?.sourceUrl;
  const featuredImageAlt = element?.featuredImage?.node?.altText;
  const title = element?.title;
  const slug = element?.slug;
  const publishedAt = moment(element?.date).format("DD/MM/YYYY");

  return (
    <Link href={`${slug}`} className="block" prefetch={true}>
      <div className="flex gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
        {featuredImage ? (
          <div className="relative w-16 h-16">
            <Image
              src={featuredImage}
              alt={featuredImageAlt || "Image de présentation"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover"
            />
          </div>
        ) : (
          <div className="relative w-16 h-16 bg-gray-200 rounded-lg"></div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h4>
          <p className="text-xs text-gray-500 mt-1">{publishedAt}</p>
        </div>
      </div>
    </Link>
  );
}
