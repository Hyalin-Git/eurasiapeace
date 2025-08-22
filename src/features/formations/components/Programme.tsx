"use server";

import Section from "@/components/Section";
import { ClipboardList } from "lucide-react";
import Dropdown from "@/components/dropdown/Dropdown";
import { isEmpty } from "@/utils/isEmpty";
import { Formation } from "@/types";

export default async function Programme({
  formation,
}: {
  formation: Formation;
}) {
  const programme = formation?.singleFormations?.programmeFormation;
  const texteIntroProgramme = programme?.texteIntroProgramme;
  const seances = programme?.seances || [];

  const programmePdf = programme?.programmePdf?.node?.filePath;

  return (
    <div id="programme">
      <Section
        icon={<ClipboardList size={44} className="text-text-primary" />}
        title="Programme de la formation"
        description={`${texteIntroProgramme}`}
        className="[&_h2]:mb-6 py-8!"
      >
        <div className="flex flex-col gap-6">
          {!isEmpty(seances) &&
            seances.map((seance, idx) => (
              <Dropdown
                key={idx}
                title={seance.titreSeance}
                content={seance.descriptionSeance}
              />
            ))}
        </div>

        {programmePdf && (
          <div className="mt-8">
            <a
              href={`/media${programmePdf.split("uploads")[1]}`}
              target="_blank"
              download
              className="block w-full sm:w-fit text-center bg-btn-force-blue text-sm text-white font-[500] px-4 py-2 rounded-md hover:bg-btn-force-blue-hover transition-all duration-300"
            >
              Télécharger le programme
            </a>
          </div>
        )}
      </Section>
    </div>
  );
}
