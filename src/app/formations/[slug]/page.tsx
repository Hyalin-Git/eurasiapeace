"use server";

import Banner from "@/components/Banner";
import { getFormation } from "@/features/formations/server/db/formations";
import NotFound from "@/app/not-found";
import { Medal } from "lucide-react";
import Tag from "@/components/tags/Tag";
import FormationNav from "@/features/formations/components/FormationNav";
import Overview from "@/features/formations/components/Overview";
import Objectives from "@/features/formations/components/Objectives";
import Programme from "@/features/formations/components/Programme";
import Modalities from "@/features/formations/components/Modalities";
import FormationReviews from "@/features/formations/components/FormationReviews";
import { isEmpty } from "@/utils/isEmpty";
import Evaluations from "@/features/formations/components/Evaluations";
import FormationRecap from "@/features/formations/components/FormationRecap";

export default async function FormationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: formation, success } = await getFormation(slug);

  if (!success) {
    return <NotFound />;
  }

  const niveauformation = formation?.niveauxDeFormation?.nodes[0]?.name;

  const tagContent = niveauformation ? niveauformation : "Aucun niveau requis";

  const bannerProps = {
    title: formation.title,
    content: "",
    src: formation?.singleFormations?.banner?.node?.sourceUrl || "",
  };

  const evaluations =
    formation?.singleFormations?.evaluations?.evaluationsBoxes || [];
  const baremePdf =
    formation?.singleFormations?.evaluations?.baremePdf?.node?.filePath;

  return (
    <div>
      <Banner BannerProps={bannerProps}>
        <Tag
          icon={<Medal size={16} />}
          content={tagContent}
          className="text-sm! text-text-third"
        />
      </Banner>
      <div className="container flex flex-col lg:flex-row gap-15 py-10">
        {/* Main content */}
        <div className="w-full lg:w-2/3">
          {/* Nav */}
          <FormationNav />
          {/* Aperçu de la formation */}
          <Overview formation={formation} />

          {/* Objectifs pédagogiques */}
          <Objectives formation={formation} />

          {/* Programme de la formation */}
          <Programme formation={formation} />

          {/* Évaluation */}
          <Evaluations evaluations={evaluations} baremePdf={baremePdf} />

          {/* Modalités */}
          <Modalities formation={formation} />
        </div>

        {/* Aside */}
        <aside className="w-full lg:w-1/3 ">
          <div className="flex flex-col gap-8 sticky top-30">
            <FormationRecap formation={formation} />

            {!isEmpty(formation?.singleFormations?.testimonials || []) && (
              <FormationReviews
                reviews={formation?.singleFormations?.testimonials}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
