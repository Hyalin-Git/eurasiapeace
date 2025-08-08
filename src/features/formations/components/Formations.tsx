"use server";

import Cards from "@/components/cards/Cards";
import { getFormations } from "../server/db/formations";

export async function Formations({
  numberOfFormations = 2,
}: {
  numberOfFormations?: number;
}) {
  const { data: formations, success } = await getFormations(numberOfFormations);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

  if (!success) {
    return <div>Aucune formation trouvée.</div>;
  }

  return (
    <Cards
      elements={formations}
      className={`lg:grid-cols-${numberOfFormations.toString()}`}
    />
  );
}
