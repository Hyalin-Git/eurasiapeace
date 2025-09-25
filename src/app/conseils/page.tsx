"use server";

import Section from "@/components/Section";
import Banner from "@/components/banners/Banner";
import ServicesCards from "@/components/cards/ServicesCards";
import { Eye, Landmark } from "lucide-react";
import Image from "next/image";
import Testimonials from "@/features/testimonials/components/Testimonials";
import { getTestimonials } from "@/features/testimonials/server/db/testimonials";
import LinkButton from "@/ui/LinkButton";
import { Metadata } from "next";
import { isEmpty } from "@/utils/isEmpty";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Conseils & Consultance - EurasiaPeace",
    description:
      "Expertise géopolitique pour institutions publiques, entreprises et ONG. Analyse stratégique, veille sur-mesure, cartographie des risques et soutien à la décision dans un contexte international complexe.",
    keywords: [
      "conseils géopolitiques",
      "consultance géopolitique",
      "analyse stratégique",
      "veille géopolitique",
      "cartographie des risques",
      "soutien à la décision",
      "expertise internationale",
      "géopolitique appliquée",
      "consulting géopolitique",
      "analyse pays",
      "risques géopolitiques",
      "institutions publiques",
      "entreprises et financements publics",
      "financements publics",
      "entreprises",
      "ONG",
      "organisations internationales",
      "OSINT",
      "HUMINT",
      "renseignement",
      "Eurasie",
    ],
    openGraph: {
      title: "Conseils & Consultance - EurasiaPeace",
      description:
        "Accompagnement géopolitique personnalisé pour institutions, entreprises et financements publics. Analyses stratégiques, veille sur-mesure et recommandations expertes.",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
          width: 1200,
          height: 630,
          alt: "Conseils & Consultance EurasiaPeace",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Conseils & Consultance - EurasiaPeace",
      description:
        "Expertise géopolitique pour décider face aux enjeux internationaux. Analyses, veille et recommandations stratégiques.",
      images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`],
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
  };
}

export default async function Conseils() {
  const { data: testimonials, success } = await getTestimonials();

  const BannerProps = {
    title: "Conseils & Consultance",
    content:
      "Comprendre et décider face aux enjeux internationaux d'aujourd'hui et de demain",
    src: "/banner/conseils-banner.webp",
  };

  const servicesData = [
    {
      id: 1,
      icon: (
        <Landmark
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-purple/40`}
        />
      ),
      title: "Institutions publiques",
      description:
        "Analyse stratégique, cartographie des risques, soutien à la décision publique.",
      className: {
        background: "bg-btn-purple/5",
        backgroundHover: "hover:bg-btn-purple/8!",
        button: "bg-btn-purple!",
        iconBackground: "from-btn-purple/40",
      },
    },
    {
      id: 2,
      icon: (
        <Landmark
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-force-blue/40`}
        />
      ),
      title: "ONG et organisations internationales",
      description:
        "Veille terrain, compréhension des dynamiques locales, appui opérationnel.",

      className: {
        background: "bg-btn-force-blue/5",
        backgroundHover: "hover:bg-btn-force-blue/8!",
        button: "bg-btn-force-blue!",
        iconBackground: "from-btn-force-blue/40",
      },
    },
    {
      id: 3,
      icon: (
        <Landmark
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-gold/40`}
        />
      ),
      title: "Entreprises et financements publics",
      description:
        "Analyse pays, risques géopolitiques, soutien à l'implantation ou à l'export.",
      className: {
        background: "bg-btn-gold/5",
        backgroundHover: "hover:bg-btn-gold/8!",
        button: "bg-btn-gold!",
        iconBackground: "from-btn-gold/40",
      },
    },
    {
      id: 4,
      icon: (
        <Landmark
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-[#505A6A]/40`}
        />
      ),
      title: "Consultants et indépendants",
      description: "Appui ponctuel, relecture critique, apport méthodologique.",
      className: {
        background: "bg-[#505A6A]/5",
        backgroundHover: "hover:bg-[#505A6A]/8!",
        button: "bg-[#505A6A]!",
        iconBackground: "from-[#505A6A]/40",
      },
    },
  ];

  return (
    <div className="mb-12">
      <Banner BannerProps={BannerProps} />
      <div className="flex flex-col gap-40 my-20 sm:my-40">
        <section className="container flex flex-col-reverse xl:flex-row justify-center items-start lg:items-center gap-16">
          <Image
            src="/image-conseils-1.webp"
            alt="Conseils"
            width={450}
            height={350}
            className="rounded-tr-[75px] rounded-bl-[75px] rounded-4xl w-full md:w-2/3 xl:w-auto"
          />
          <div className="[&_h2]:text-2xl [&_h2]:font-medium !py-0 [&>div>div]:lg:items-center">
            <div className="flex items-start gap-4">
              <Eye size={24} className="text-midnight-green  sm:block" />
              <h2 className="font-bold">Géopolitique appliquée à vos enjeux</h2>
            </div>
            <p
              className={`text-black/50 mt-2 mb-10 text-lg max-w-4xl hidden`}
            ></p>
            <div className="flex flex-col gap-4 max-w-160">
              <p>
                Nos experts vous accompagnent dans l&apos;analyse et la gestion
                des dynamiques géopolitiques, économiques et sécuritaires qui
                façonnent votre environnement stratégique.
              </p>

              <p>
                Grâce à une approche rigoureuse, pluridisciplinaire et adaptée à
                vos enjeux spécifiques, nous vous aidons à anticiper les
                évolutions du contexte international, à identifier les risques
                et opportunités, et à éclairer vos prises de décision dans un
                monde en constante mutation.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-10">
              <LinkButton
                href={"/contact"}
                label="Contactez notre équipe"
                className="w-full md:w-auto mx-0! bg-midnight-green hover:bg-midnight-green/90"
              />
              <p className="text-sm">
                +20 livrables produits en 2024 pour nos partenaires
              </p>
            </div>
          </div>
        </section>

        <section>
          <Section
            title="À qui s'adresse notre expertise ?"
            description="Nos services s'adressent à tous les acteurs confrontés à des enjeux internationaux complexes. Chaque profil a ses besoins : nous adaptons notre accompagnement en conséquence."
            icon={<Eye size={24} className="text-midnight-green" />}
            className="container [&_h2]:text-2xl [&_h2]:font-medium !py-0 "
          >
            <ServicesCards
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              servicesData={servicesData}
              classNameToChild="[&_h2]:text-2xl [&_h2]:font-medium"
            />
          </Section>
        </section>

        <section>
          <div className="relative container flex flex-col justify-between lg:flex-row gap-4">
            <Section
              title="Nos solutions d'analyse géopolitique"
              description="Nos interventions sont confidentielles, ciblées et livrées dans les formats les plus pertinents pour votre structure."
              className="block lg:sticky top-30 h-fit [&_h2]:text-2xl [&_h2]:font-medium !py-0"
            >
              <LinkButton
                href={"/contact"}
                label="Contactez notre équipe"
                className="hidden! lg:block! mx-0! bg-midnight-green hover:bg-midnight-green/90"
              />
            </Section>
            <div className="flex flex-col gap-8 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:mb-2">
              <Section title="VEILLE STRATÉGIQUE SUR-MESURE" className="!py-0">
                <ul className="list-disc text-sm/7 pl-4 lg:pl-0">
                  <li>
                    <p>
                      Suivi régulier d&apos;une zone géographique, d&apos;un
                      acteur ou d&apos;un enjeu spécifique
                    </p>
                  </li>
                  <li>
                    <p>Rapports livrés à la fréquence de votre choix</p>
                  </li>
                  <li>
                    <p>Analyse claire, exploitable, adaptée à vos priorités</p>
                  </li>
                  <li>
                    <p>Format court (brief) ou développé (rapport complet)</p>
                  </li>
                </ul>
              </Section>
              <Section
                title="ANALYSE, RECHERCHE ET RENSEIGNEMENT"
                className="!py-0"
              >
                <ul className="list-disc text-sm/7 pl-4 lg:pl-0">
                  <li>
                    <p>
                      Articles de recherche, notes d&apos;analyse, fiches
                      techniques
                    </p>
                  </li>
                  <li>
                    <p>
                      Rapports croisant OSINT (source ouverte) et HUMINT (source
                      humaine)
                    </p>
                  </li>
                  <li>
                    <p>Livrables adaptés à votre niveau d&apos;expertise</p>
                  </li>
                  <li>
                    <p>
                      Possibilité de produire des documents techniques, neutres
                      ou vulgarisés
                    </p>
                  </li>
                </ul>
              </Section>
              <Section title="RECOMMANDATIONS STRATÉGIQUES" className="!py-0">
                <ul className="list-disc text-sm/7 pl-4 lg:pl-0">
                  <li>
                    <p>
                      Conseils structurés à partir de nos analyses ou de vos
                      enjeux internes
                    </p>
                  </li>
                  <li>
                    <p>
                      Livrables activables pour vos prises de décision (memos,
                      recommandations)
                    </p>
                  </li>
                  <li>
                    <p>
                      Prise en compte du contexte, des acteurs clés et des
                      contraintes locales
                    </p>
                  </li>
                  <li>
                    <p>Accompagnement ponctuel ou continu selon vos besoins</p>
                  </li>
                </ul>
              </Section>
            </div>
          </div>
        </section>
      </div>

      {success && !isEmpty(testimonials) && (
        <section className="flex justify-center items-center w-full bg-background-third py-20">
          <Testimonials testimonials={testimonials} />
        </section>
      )}

      <section className="container flex items-center justify-center flex-col gap-4 mt-12 mx-100%">
        <div className="flex items-center justify-center flex-col gap-4 bg-midnight-green max-w-175 p-8 rounded-lg w-full">
          <h2 className="text-white text-center">
            Discutons de vos enjeux, en{" "}
            <span className="text-btn-gold whitespace-nowrap">
              toute confidentialité
            </span>
          </h2>
          <LinkButton
            href={"/contact"}
            label="Contactez notre équipe"
            className="text-black! bg-white hover:bg-gray-100/90"
          />
        </div>
      </section>
    </div>
  );
}
