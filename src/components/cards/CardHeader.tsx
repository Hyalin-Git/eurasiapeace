"use client";

import Category from "@/components/Category";
import CardBanner from "@/components/cards/CardBanner";
import Tooltip from "@/ui/Tooltip";
import Tag from "@/components/tags/Tag";
import { Circle, CircleAlert, Medal } from "lucide-react";
import { offset, useFloating } from "@floating-ui/react";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
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
    element?.typesDeCulture?.nodes[0];

  const { sourceUrl, altText } = element?.featuredImage?.node || {};

  const contentType = element?.contentType?.node?.name || "";

  return (
    <div>
      <div className="absolute z-1 top-2 left-2">
        <Category category={category} type={contentType} />
      </div>

      {/* Formation meta */}
      {variant === "formation" && <FormationVariant element={element} />}

      <CardBanner imageUrl={sourceUrl} imageAlt={altText} bannerSize={height} />
    </div>
  );
}

function FormationVariant({ element }: { element: ElementProps }) {
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isRythmeOpen, setIsRythmeOpen] = useState(false);

  const category =
    element?.categories?.nodes[0] ||
    element?.typeDeVeilles?.nodes[0] ||
    element?.typesDeFormations?.nodes[0] ||
    element?.typesDeCulture?.nodes[0];

  const rythme = element?.rythmesDeFormation?.nodes || [];
  const niveauformation = element?.niveauxDeFormation?.nodes[0]?.name || "";

  const { refs: refsLevel, floatingStyles: floatingStylesLevel } = useFloating({
    open: isLevelOpen,
    placement: "top",
    middleware: [offset(6)],
  });

  const { refs: refsRythme, floatingStyles: floatingStylesRythme } =
    useFloating({
      open: isRythmeOpen,
      placement: "top",
      middleware: [offset(6)],
    });

  const generateLevelFloatingText = useCallback(() => {
    if (niveauformation) {
      if (niveauformation.includes("débutant")) {
        return `Cette formation est recommandée pour les débutants en ${category?.name}`;
      } else if (niveauformation.includes("intermédiaire")) {
        return `Cette formation est recommandée pour les personnes ayant déjà acquise une expérience intermédiaire en ${category?.name}`;
      } else if (niveauformation.includes("confirmé")) {
        return `Cette formation est recommandée pour les personnes ayant déjà acquise une expérience confirmée en ${category?.name}`;
      }
    } else {
      return "Cette formation est recommandée pour tous les niveaux";
    }
  }, [niveauformation, category?.name]);

  const generateRythmeFloatingText = useCallback(() => {
    if (rythme) {
      return `Cette formation est proposée en rythme ${rythme
        .map((r) => r?.name?.toLowerCase())
        .join("ou ")}`;
    } else {
      return "Cette formation est proposée en rythme flexible";
    }
  }, [rythme]);

  const levelTagContent = niveauformation
    ? niveauformation
    : "Aucun niveau recommandé";

  const isProgressif = rythme?.some((r) =>
    r?.name?.toLowerCase().includes("progressif")
  );
  const isIntensif = rythme?.some((r) =>
    r?.name?.toLowerCase().includes("intensif")
  );
  const defaultRythmeColor =
    "border! border-btn-force-blue! text-btn-force-blue!";
  const progressifRythmeColor = "border! border-green-600! text-green-600!";
  const intensifRythmeColor = "border! border-orange-400! text-orange-400!";

  return (
    <div>
      {niveauformation && (
        <div className="absolute z-1 top-2 right-2 text-black text-xs flex flex-col items-end gap-2">
          {/* Level */}
          <div
            ref={refsLevel.setReference}
            onMouseEnter={() => setIsLevelOpen(true)}
            onMouseLeave={() => setIsLevelOpen(false)}
          >
            <Tag icon={<Medal size={16} />} content={levelTagContent} />
          </div>

          {/* Floating */}
          {isLevelOpen &&
            createPortal(
              <div
                ref={refsLevel.setFloating}
                style={floatingStylesLevel}
                className="animate-fadeIn z-50"
              >
                <Tooltip
                  icon={<CircleAlert size={16} />}
                  content={generateLevelFloatingText() || ""}
                  className="max-w-[480px]!"
                />
              </div>,
              document.body
            )}

          {/* Rythme */}
          {rythme?.length > 0 && (
            <div
              ref={refsRythme.setReference}
              onMouseEnter={() => setIsRythmeOpen(true)}
              onMouseLeave={() => setIsRythmeOpen(false)}
            >
              <Tag
                icon={
                  <Circle
                    size={8}
                    className={`${
                      isProgressif ? "text-green-600 fill-green-600" : ""
                    } ${
                      isIntensif
                        ? "text-orange-400 fill-orange-400"
                        : "text-btn-force-blue fill-btn-force-blue"
                    }`}
                  />
                }
                content={rythme?.map((r) => r?.name).join(", ")}
                className={`${
                  isProgressif ? progressifRythmeColor : defaultRythmeColor
                } ${isIntensif ? intensifRythmeColor : defaultRythmeColor}`}
              />
            </div>
          )}

          {/* Floating */}
          {isRythmeOpen &&
            createPortal(
              <div
                ref={refsRythme.setFloating}
                style={floatingStylesRythme}
                className="animate-fadeIn z-50"
              >
                <Tooltip
                  icon={<CircleAlert size={16} />}
                  content={generateRythmeFloatingText()}
                  className="max-w-[480px]!"
                />
              </div>,
              document.body
            )}
        </div>
      )}
    </div>
  );
}
