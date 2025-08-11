"use server";
import Card from "./Card";
import { isEmpty } from "@/utils/isEmpty";
import { ElementProps } from "@/components/cards/types";

export default async function Cards({
  elements,
  variant = "article",
  className,
}: {
  elements: ElementProps[];
  variant?: "article" | "formation";
  className?: string;
}) {
  return (
    <div>
      {!isEmpty(elements) && (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${className} gap-8`}>
          {elements.map((elt, idx) => (
            <Card key={elt?.id || idx} elt={elt} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
}
