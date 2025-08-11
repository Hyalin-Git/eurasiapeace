"use server";

import { ElementProps } from "@/components/cards/types";
import "moment/locale/fr";
import CardHeader from "@/components/cards/CardHeader";
import CardBody from "@/components/cards/CardBody";
import CardFooter from "@/components/cards/CardFooter";
import CardMeta from "./CardMeta";

interface CardProps {
  elt: ElementProps;
  variant?: "article" | "formation";
  cardStyles?: {
    banner: string;
    title: string;
    lineClamp: string;
    footer: string;
  };
}

export default async function Card({
  elt,
  variant = "article",
  cardStyles,
}: CardProps) {
  const bannerHeight = cardStyles?.banner || "h-[200px]";

  const bodyStyles = {
    titleSize: cardStyles?.title || "text-lg",
    lineClamp: cardStyles?.lineClamp || "line-clamp-3",
  };

  return (
    <div className="group relative flex flex-col bg-background-light-primary rounded-md border border-gray-200 h-full text-left animate-cardPop shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300">
      {/* Card header */}
      <CardHeader element={elt} variant={variant} height={bannerHeight} />

      {/* Card content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Card meta */}
          <CardMeta variant={variant} element={elt} />

          {/* Card body */}
          <CardBody element={elt} bodyStyles={bodyStyles} />
        </div>

        {/* Card footer */}
        <CardFooter variant={variant} />
      </div>
    </div>
  );
}
