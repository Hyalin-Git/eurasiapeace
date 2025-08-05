"use client";
import Section from "@/components/Section";
import Banner from "@/components/Banner";
import ServicesCards from "@/components/cards/ServicesCards";
import Button from "@/ui/Button";
import {
  CircleArrowLeft,
  CircleArrowRight,
  Eye,
  Landmark,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import CardOpinion from "@/components/cards/CardOpinion";

export default function Conseils() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.autoplay?.stop();
      swiperInstance.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.autoplay?.stop();
      swiperInstance.slideNext();
    }
  };

  const BannerProps = {
    title: "Conseils & Consultance",
    content:
      "Comprendre et décider face aux enjeux internationaux d'aujourd'hui et de demain",
    image: "bg-[url('/banner/conseils-banner.webp')]",
    className:
      "before:bg-[linear-gradient(to_right,_#031e42_14%,_#355b7c0d_85%)]",
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
      button: {
        label: `Échanger avec un expert institutionnel`,
      },
      href: "/publications",
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
      button: {
        label: `Recevoir un brief opérationnel`,
      },
      href: "/publications",
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
      title: "Entreprises et acteurs économiques",
      description:
        "Analyse pays, risques géopolitiques, soutien à l'implantation ou à l'export.",
      button: {
        label: `Obtenir un rapport géostratégique`,
      },
      href: "/publications",
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
      button: {
        label: `Solliciter un appui expert`,
      },
      href: "/publications",
      className: {
        background: "bg-[#505A6A]/5",
        backgroundHover: "hover:bg-[#505A6A]/8!",
        button: "bg-[#505A6A]!",
        iconBackground: "from-[#505A6A]/40",
      },
    },
  ];

  const testimonials = [
    {
      id: 1,
      stars: 3,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/featured-image.jpg",
        firstname: "Tim",
        lastname: "Smith",
      },
    },
    {
      id: 2,
      stars: 4,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/image-conseils-1.webp",
        firstname: "Tim",
        lastname: "Smith",
      },
    },
    {
      id: 3,
      stars: 5,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/image-conseils-1.webp",
        firstname: "Tim",
        lastname: "Smith",
      },
    },
    {
      id: 4,
      stars: 5,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/image-conseils-1.webp",
        firstname: "John",
        lastname: "Doe",
      },
    },
    {
      id: 5,
      stars: 5,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/image-conseils-1.webp",
        firstname: "John",
        lastname: "Doe",
      },
    },
    {
      id: 6,
      stars: 5,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/image-conseils-1.webp",
        firstname: "John",
        lastname: "Doe",
      },
    },
    {
      id: 7,
      stars: 5,
      content:
        "«L'équipe d'Eurasia Peace a réalisé un travail de veille stratégique sur la zone du Sahel, en particulier sur le Mali, qui nous a permis de mieux comprendre les enjeux et les dynamiques locales. Leur approche est rigoureuse et adaptée à nos besoins.»",
      user: {
        image: "/image-conseils-1.webp",
        firstname: "Hey",
        lastname: "Doe",
        className: "[&_h1]:text-2xl!",
      },
    },
  ];

  return (
    <main>
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
              <h2 className="text-4xl font-bold">
                Géopolitique appliquée à vos enjeux
              </h2>
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
              <Button type="button" className="w-full md:w-auto">
                Contactez notre équipe
              </Button>
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
              <Button type="button" className="hidden lg:block">
                Contactez notre équipe
              </Button>
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
      <section className="flex justify-center items-center w-full bg-background-third py-20">
        <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex flex-row lg:flex-col justify-between lg:justify-start flex-1 pl-0 lg:pl-8 gap-8 lg:gap-16 w-full lg:w-1/5">
            <div className="flex flex-col gap-2">
              <Quote
                size={40}
                className="text-midnight-green fill-midnight-green"
              />
              <h2 className="text-2xl lg:text-3xl font-medium">
                <span className="lg:whitespace-nowrap">Avis de nos</span>{" "}
                partenaires
              </h2>
            </div>
            <div className="flex items-end lg:items-center gap-4">
              <CircleArrowLeft
                size={32}
                className="text-midnight-green cursor-pointer hover:text-midnight-green/80 transition-colors"
                onClick={handlePrevSlide}
              />
              <CircleArrowRight
                size={32}
                className="text-midnight-green cursor-pointer hover:text-midnight-green/80 transition-colors"
                onClick={handleNextSlide}
              />
            </div>
          </div>

          {/* Testimonials */}
          <div className="Conseils_Testimonials relative w-full lg:w-4/6 xl:w-4/5">
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Autoplay]}
              spaceBetween={15}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1420: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="w-full h-auto"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="md:flex-1 h-auto">
                  <CardOpinion
                    stars={testimonial.stars}
                    content={testimonial.content}
                    user={testimonial.user}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="container flex items-center justify-center flex-col gap-4 my-40 mx-100%">
        <div className="flex items-center justify-center flex-col gap-4 bg-midnight-green max-w-175 p-8 rounded-lg w-full">
          <h2 className="text-white text-3xl sm:text-4xl text-center">
            Discutons de vos enjeux, en{" "}
            <span className="text-btn-gold whitespace-nowrap">
              toute confidentialité
            </span>
          </h2>
          <p className="text-sm/7 text-white text-center">
            L&apos;équipe d&apos;Eurasia Peace a réalisé un travail de veille
            stratégique sur la zone du Sahel, en particulier sur le Mali, qui
            nous a permis de mieux comprendre les enjeux et les dynamiques
            locales. Leur approche est rigoureuse et adaptée à nos besoins.
          </p>
          <Button type="button" className="bg-white !text-midnight-green w-fit">
            Contactez notre équipe
          </Button>
        </div>
      </section>
    </main>
  );
}
