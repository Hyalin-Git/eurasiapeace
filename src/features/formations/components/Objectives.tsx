import { CirclePlus, Crosshair } from "lucide-react";
import { isEmpty } from "@/utils/isEmpty";
import InfoBoxColumn from "@/features/formations/components/InfoBoxColumn";
import Section from "@/components/Section";
import { Formation } from "@/types";

export default function Objectives({ formation }: { formation: Formation }) {
  const objectifsPeda =
    formation.singleFormations.objectifsPedagogiques.texteIntroObjectifs;
  const objectifs = formation.singleFormations.objectifsPedagogiques.objectifs;

  return (
    <div id="objectives">
      <Section
        icon={<Crosshair size={44} className="text-text-primary" />}
        title="Objectifs pédagogiques"
        description={`${objectifsPeda}`}
        className="[&_h2]:mb-6 py-8!"
      >
        <div className="flex flex-col gap-6">
          {!isEmpty(objectifs) &&
            objectifs.map((obj, idx) => (
              <InfoBoxColumn
                key={idx}
                icon={
                  <CirclePlus
                    size={24}
                    className="text-btn-gold min-h-6 min-w-6 relative top-0.5"
                  />
                }
                title={obj?.titreObjectif}
                content={obj?.descriptionObjectif}
              />
            ))}
        </div>
      </Section>
    </div>
  );
}
