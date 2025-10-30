"use client";

import Category from "@/components/Category";
import CardBanner from "@/components/cards/CardBanner";
import Tag from "@/components/tags/Tag";
import { BookOpenText, FastForward, FileText, Medal } from "lucide-react";
import { ElementProps } from "./types";

export default function CardHeader({
  element,
  variant,
  height,
}: {
  element: ElementProps;
  variant: "article" | "formation";
  height: string;
}) {
  const category =
    element?.categories?.nodes[0] ||
    element?.typeDeVeilles?.nodes[0] ||
    element?.typesDeFormations?.nodes[0] ||
    element?.typesExperts?.nodes[0];

  const { sourceUrl, altText } = element?.featuredImage?.node || {};

  const contentType = element?.contentType?.node?.name || "";

  const pdfPageCount = element?.acfFields?.nombreDePagePdf;
  const pagePlural = pdfPageCount > 1 ? "pages" : "page";

  return (
    <div>
      <div className="absolute z-1 top-2 left-2">
        <Category category={category} type={contentType} />
      </div>

      {pdfPageCount && (
        <div className="absolute z-1  top-2 right-2">
          <Tag
            icon={<BookOpenText size={16} />}
            content={pdfPageCount.toString() + " " + pagePlural}
          />
        </div>
      )}

      {/* Formation meta */}
      {variant === "formation" && <FormationVariant element={element} />}

      <CardBanner imageUrl={sourceUrl} imageAlt={altText} bannerSize={height} />
    </div>
  );
}

function FormationVariant({ element }: { element: ElementProps }) {
  const rythme = element?.rythmesDeFormation?.nodes[0]?.name || "";
  const niveauformation = element?.niveauxDeFormation?.nodes[0]?.name || "";

  const levelTagContent = niveauformation
    ? niveauformation
    : "Aucun niveau recommandé";

  return (
    <div>
      {niveauformation && (
        <div className="absolute z-1 top-2 right-2 text-black text-xs flex flex-col items-end gap-2">
          {/* Level */}
          {niveauformation && (
            <Tag icon={<Medal size={16} />} content={levelTagContent} />
          )}

          {/* Rythme */}
          {rythme && <Tag icon={<FastForward size={16} />} content={rythme} />}
        </div>
      )}
    </div>
  );
}
