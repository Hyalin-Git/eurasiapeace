import Section from "@/components/Section";
import { FileChartColumn } from "lucide-react";
import InfoBoxColumn from "@/features/formations/components/InfoBoxColumn";
import { Formation } from "@/types";

export default function Evaluation({ formation }: { formation: Formation }) {
  const evaluation = formation?.singleFormations?.evaluation;
  const evaluationRapport = evaluation?.evaluationRapport;

  return (
    <div id="evaluation">
      <Section
        icon={<FileChartColumn size={44} className="text-text-primary" />}
        title="Évaluation"
        className="py-8!"
      >
        <InfoBoxColumn
          title="Évaluation du rapport de renseignement final"
          content={evaluationRapport}
          className="[&>div]:justify-center!"
        />
      </Section>
    </div>
  );
}
