import { Calendar, Eye, ListCheck, Sparkles, Users } from "lucide-react";
import InfoBoxRow from "@/features/formations/components/InfoBoxRow";
import Section from "@/components/Section";
import { Formation } from "@/types";

export default function Overview({ formation }: { formation: Formation }) {
  const apercuFormation =
    formation?.singleFormations?.apercuFormation?.texteIntroFormation;
  const publicsCibles =
    formation?.singleFormations?.apercuFormation?.publicsCibles
      ?.textePublicsCibles;
  const modalites = formation?.singleFormations?.apercuFormation?.modalite;
  const rythme =
    formation?.rythmesDeFormation?.nodes[0]?.name || "Non renseigné";
  const prerequis =
    formation?.singleFormations?.apercuFormation?.prerequis?.textePrerequis;
  const benefices =
    formation?.singleFormations?.apercuFormation?.benefices?.texteBenefices;

  const infoBoxes = [
    {
      id: 1,
      icon: <Users size={24} className="text-btn-gold" />,
      title: "Publics cibles",
      content: publicsCibles,
    },
    {
      id: 2,
      icon: <Calendar size={24} className="text-btn-gold" />,
      title: "Modalités",
      content: `<ul>    
        <li><strong>Durée</strong> : ${modalites?.dureeFormation}h de formation</li>
        <li><strong>Nombre de participants</strong> : ${modalites?.nombreParticipants} personnes</li>
        <li><strong>Format</strong> : ${modalites?.format}</li>
        <li><strong>Rythme</strong> : ${rythme}</li>
        <li><strong>Langue</strong> : ${modalites?.langue}</li>
        </ul>`,
    },
    {
      id: 3,
      icon: <ListCheck size={24} className="text-btn-gold" />,
      title: "Prérequis",
      content: prerequis,
    },
    {
      id: 4,
      icon: <Sparkles size={24} className="text-btn-gold" />,
      title: "Plus value",
      content: benefices,
    },
  ];

  return (
    <div id="overview">
      <Section
        icon={<Eye size={44} className="text-text-primary" />}
        title="Aperçu de la formation"
        description={`${apercuFormation}`}
        className="[&_h2]:mb-6 py-8!"
      >
        <div className="flex flex-col gap-6">
          {infoBoxes.map((infoBox) => (
            <InfoBoxRow key={infoBox.id} {...infoBox} />
          ))}
        </div>
      </Section>
    </div>
  );
}
