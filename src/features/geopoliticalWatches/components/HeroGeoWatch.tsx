"use server";

import Card from "@/components/cards/Card";
import NoHeroPostFound from "./NoHeroGeoFound";
import { getHeroGeoWatch } from "../server/db/geopoliticalWatches";

export default async function HeroGeoWatch() {
  const cardStyles = {
    banner: "h-[380px]",
    title: "text-3xl",
    lineClamp: "line-clamp-4",
    footer: "justify-end",
  };

  const { data: geoWatch, success } = await getHeroGeoWatch();

  if (!success || !geoWatch) {
    return <NoHeroPostFound />;
  }

  return <Card elt={geoWatch} cardStyles={cardStyles} />;
}
