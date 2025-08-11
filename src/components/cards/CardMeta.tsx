"use server";

import moment from "moment";
import Tags from "../tags/Tags";
import "moment/locale/fr";
import { Clock, Users } from "lucide-react";
import { ElementProps } from "./types";

export default async function CardMeta({
  variant = "article",
  element,
}: {
  variant: "article" | "formation";
  element: ElementProps;
}) {
  if (variant === "formation") return <MetaFormation element={element} />;

  return <MetaArticle element={element} />;
}

function MetaArticle({ element }: { element: ElementProps }) {
  const tags = element?.tags?.nodes || [];
  const date = element?.date || "";

  const fromNowFormat = moment(date).fromNow();

  return (
    <div className="flex justify-between gap-2 mb-4">
      <div className="flex flex-wrap gap-2 mb-2 max-w-[80%]">
        <Tags tags={tags} sliced={true} truncated={true} />
      </div>
      <div className="min-w-max">
        <span className="text-sm text-text-secondary">{fromNowFormat}</span>
      </div>
    </div>
  );
}

function MetaFormation({ element }: { element: ElementProps }) {
  const { dureeFormation, nombreParticipants } =
    element?.singleFormations?.apercuFormation?.modalite || {};

  return (
    <div className="flex items-center gap-4 mb-4 text-sm *:text-text-secondary *:flex *:items-center *:gap-1">
      <span>
        <Users size={16} /> {nombreParticipants} personnes
      </span>
      <span>
        <Clock size={16} /> durée {dureeFormation} heures
      </span>
    </div>
  );
}
