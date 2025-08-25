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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: formation, success } = await getFormation(slug);

  if (!success || !formation) {
    return {
      title: "Formation non trouvée",
      description: "Cette formation n'existe pas ou n'est plus disponible.",
    };
  }

  const title = `${formation.title}`;
  const description =
    formation.excerpt ||
    formation?.singleFormations?.apercuFormation?.texteIntroFormation ||
    `Découvrez notre formation ${formation.title}. Formation géopolitique interdisciplinaire dispensée par des experts EurasiaPeace.`;
  const imageUrl =
    formation?.singleFormations?.banner?.node?.sourceUrl ||
    "/banner/formation-banner.webp";
  const publishedDate = formation.date;

  // Extraire les informations spécifiques aux formations
  const typesDeFormation =
    formation.typesDeFormations?.nodes?.map(
      (type: { name: string; slug: string }) => type.name
    ) || [];
  const niveauxDeFormation =
    formation.niveauxDeFormation?.nodes?.map(
      (niveau: { name: string; slug: string }) => niveau.name
    ) || [];
  const rythmesDeFormation =
    formation.rythmesDeFormation?.nodes?.map(
      (rythme: { name: string; slug: string }) => rythme.name
    ) || [];

  // Informations sur la modalité de la formation
  const duree =
    formation?.singleFormations?.apercuFormation?.modalite?.dureeFormation;
  const nombreParticipants =
    formation?.singleFormations?.apercuFormation?.modalite?.nombreParticipants;

  const keywords = [
    ...typesDeFormation,
    ...niveauxDeFormation,
    ...rythmesDeFormation,
    "formation géopolitique",
    "formation professionnelle",
    "Eurasie",
    "géopolitique",
    "centre de formation",
    "formation interdisciplinaire",
    "éducation géopolitique",
    "think-tank",
    "formation continue",
    "EurasiaPeace",
  ];

  // Construire une description enrichie avec les détails de la formation
  let enrichedDescription = description;
  if (duree) {
    enrichedDescription += ` Durée: ${duree}.`;
  }
  if (nombreParticipants) {
    enrichedDescription += ` Participants: ${nombreParticipants}.`;
  }

  return {
    title,
    description: enrichedDescription,
    keywords,
    authors: [{ name: "EurasiaPeace" }],
    publisher: "EurasiaPeace",
    openGraph: {
      title,
      description: enrichedDescription,
      type: "article",
      publishedTime: publishedDate,
      authors: ["EurasiaPeace"],
      section: typesDeFormation[0] || "Formations",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${formation.title} - Formation EurasiaPeace`,
        },
      ],
      siteName: "EurasiaPeace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: enrichedDescription,
      images: [imageUrl],
      creator: "@EurasiaPeace",
      site: "@EurasiaPeace",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/formations/${slug}`,
    },
  };
}

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
