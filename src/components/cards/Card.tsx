import { ElementProps } from "@/components/cards/types";
import "moment/locale/fr";
import CardHeader from "@/components/cards/CardHeader";
import CardMeta from "@/components/cards/CardMeta";
import CardBody from "@/components/cards/CardBody";
import MetaPublication from "@/components/cards/MetaPublication";
import MetaFormation from "@/components/cards/MetaFormation";
import CardFooter from "@/components/cards/CardFooter";

interface CardProps {
  elt: ElementProps;
  variant?: "publication" | "formation";
  displayAuthor?: boolean;
  cardStyles?: {
    banner: string;
    title: string;
    lineClamp: string;
    footer: string;
  };
}

export default function Card({
  elt,
  variant = "publication",
  cardStyles,
  displayAuthor = false,
}: CardProps) {
  const tags = elt?.tags?.nodes || [];
  const category =
    elt?.categories?.nodes[0] ||
    elt?.typeDeVeilles?.nodes[0] ||
    elt?.typesDeFormations?.nodes[0] ||
    elt?.typesDeCulture?.nodes[0];
  const contentType = elt?.contentType?.node?.name || "";

  const banner = {
    url: elt?.featuredImage?.node?.sourceUrl,
    alt: elt?.featuredImage?.node?.altText,
    size: cardStyles?.banner || "h-[200px]",
  };

  const body = {
    title: elt?.title,
    excerpt: elt?.excerpt,
    contentType: contentType,
    slug: elt?.slug,
  };

  const bodyStyles = {
    titleSize: cardStyles?.title || "text-lg",
    lineClamp: cardStyles?.lineClamp || "line-clamp-3",
  };

  const metaPublication = {
    tags: tags,
    date: elt?.date,
    displayAuthor: displayAuthor,
    author: elt?.author?.node?.name,
  };

  const metaFormation = {
    dureeFormation:
      elt?.singleFormations?.apercuFormation?.modalite?.dureeFormation ||
      "Non renseignée",
    nombreParticipants:
      elt?.singleFormations?.apercuFormation?.modalite?.nombreParticipants ||
      "Non renseigné",
    rythme: elt?.rythmesDeFormation?.nodes || [],
    niveauformation: elt?.niveauxDeFormation?.nodes[0]?.name || "",
  };

  return (
    <div className="group relative flex flex-col bg-background-light-primary rounded-md border border-gray-200 h-full text-left animate-cardPop shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300">
      {/* Card header */}
      <CardHeader
        category={category}
        banner={banner}
        variant={variant}
        metaFormation={metaFormation}
      />

      {/* Card content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Card meta */}
          {variant === "publication" && (
            <CardMeta>
              <MetaPublication metaPublication={metaPublication} />
            </CardMeta>
          )}
          {variant === "formation" && (
            <CardMeta>
              <MetaFormation metaFormation={metaFormation} />
            </CardMeta>
          )}

          {/* Card body */}
          <CardBody body={body} bodyStyles={bodyStyles} />
        </div>

        {/* Card footer */}
        <CardFooter variant={variant} />
      </div>
    </div>
  );
}
