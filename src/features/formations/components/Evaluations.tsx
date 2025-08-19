import Section from "@/components/Section";
import { FileChartColumn } from "lucide-react";
import InfoBoxColumn from "@/features/formations/components/InfoBoxColumn";
import { Evaluations as EvaluationsInter } from "../types";
import { isEmpty } from "@/utils/isEmpty";

export default function Evaluations({
  evaluations,
}: {
  evaluations: EvaluationsInter[];
}) {
  if (isEmpty(evaluations || [])) return null;

  return (
    <div id="evaluation">
      <Section
        icon={<FileChartColumn size={44} className="text-text-primary" />}
        title="Évaluation"
        className="[&_h2]:mb-6 py-8!"
      >
        {evaluations.map((elt, idx) => {
          return (
            <Evaluation
              key={idx}
              title={elt.evaluationTitle}
              content={elt.evaluationDescription}
            />
          );
        })}
      </Section>
    </div>
  );
}

function Evaluation({ title, content }: { title: string; content: string }) {
  return (
    <InfoBoxColumn
      title={title}
      content={content}
      className="[&>div]:justify-center!"
    />
  );
}
