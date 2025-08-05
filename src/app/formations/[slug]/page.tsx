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
import Evaluation from "@/features/formations/components/Evaluation";
import Modalities from "@/features/formations/components/Modalities";
import FormationAside from "@/features/formations/components/FormationAside";

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
    image:
      "bg-[url('/banner/formation-banner.webp')] bg-cover bg-center bg-no-repeat",
  };
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
          <Evaluation formation={formation} />

          {/* Modalités */}
          <Modalities formation={formation} />
        </div>
        <aside className="w-full lg:w-1/3">
          <FormationAside formation={formation} />
        </aside>
      </div>
    </div>
  );
}
