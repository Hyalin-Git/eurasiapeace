import Section from "@/components/Section";
import { FileChartColumn } from "lucide-react";
import InfoBoxColumn from "@/features/formations/components/InfoBoxColumn";
import { Evaluations as EvaluationsInter } from "../types";
import { isEmpty } from "@/utils/isEmpty";

export default function Evaluations({
  evaluations,
  baremePdf,
}: {
  evaluations: EvaluationsInter[];
  baremePdf: string | undefined;
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

        {baremePdf && (
          <div className="mt-8">
            <a
              href={`/media${baremePdf?.split("uploads")[1]}`}
              target="_blank"
              download
              className="block w-full sm:w-fit text-center bg-btn-force-blue text-sm text-white font-[500] px-4 py-2 rounded-md hover:bg-btn-force-blue-hover transition-all duration-300"
            >
              Télécharger le barème
            </a>
          </div>
        )}
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
