import "moment/locale/fr";
import Link from "next/link";
import { generateLink } from "@/utils/generateLink";
import { ElementProps } from "./types";

export default function CardBody({
  element,
  bodyStyles,
}: {
  element: ElementProps;
  bodyStyles: {
    titleSize: string;
    lineClamp: string;
  };
}) {
  const { title, excerpt, slug } = element;
  const contentType = element?.contentType?.node?.name || "";
  const { titleSize, lineClamp } = bodyStyles;

  return (
    <div>
      <h3
        className={`${titleSize} font-semibold mb-4 line-clamp-2 hover:text-midnight-green transition-colors duration-300 cursor-pointer`}
      >
        <Link
          href={generateLink(contentType, slug)}
          prefetch={true}
          className="before:absolute before:content-[''] before:top-0 before:left-0 before:right-0 before:bottom-0"
        >
          {title || "Aucun titre"}
        </Link>
      </h3>
      <div
        className={`text-sm text-text-secondary *:text-text-secondary ${lineClamp} mb-4`}
        dangerouslySetInnerHTML={{
          __html: excerpt || "<p>Aucun extrait disponible</p>",
        }}
      />
    </div>
  );
}
