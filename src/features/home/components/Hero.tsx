"use server";
import Card from "@/components/cards/Card";
import ServicesCards from "@/components/cards/ServicesCards";
import { ElementProps } from "@/components/cards/types";
import { BookOpen, Gem, GraduationCap } from "lucide-react";

export default async function Hero({ post }: { post: ElementProps }) {
  const cardStyles = {
    banner: "h-[380px]",
    title: "text-3xl",
    lineClamp: "line-clamp-4",
    footer: "justify-end",
  };

  const servicesData = [
    {
      id: 1,
      icon: (
        <BookOpen
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-purple/40`}
        />
      ),
      title: "Publications",
      description:
        "Production intellectuelle de notre think-tank pour alimenter votre réflexion stratégique et développer votre connaissance de l'espace eurasiatique.",
      button: {
        label: `Lire nos publications`,
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
        <Gem
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-gold/40`}
        />
      ),
      title: "Conseils",
      description:
        "Analyses précises et regards externes rigoureux pour vous accompagner dans vos prises de décisions à court, moyen et long terme.",
      button: {
        label: `Découvrir ce service`,
      },
      href: "/conseils",
      className: {
        background: "bg-btn-gold/5",
        backgroundHover: "hover:bg-btn-gold/8!",
        iconBackground: "from-btn-gold/40",
        button: "bg-btn-gold!",
      },
    },
    {
      id: 3,
      icon: (
        <GraduationCap
          className={`h-14 w-14 p-3 text-text-primary rounded-md bg-linear-to-br from-btn-force-blue/40`}
        />
      ),
      title: "Formations",
      description:
        "Modules sur mesure avec des formateurs spécialistes pour développer votre maîtrise dans des domaines de compétences prisés.",
      button: {
        label: `Découvrir ce service`,
      },
      href: "/formations",
      className: {
        background: "bg-btn-force-blue/5",
        backgroundHover: "hover:bg-btn-force-blue/8!",
        iconBackground: "from-btn-force-blue/40",
        button: "bg-btn-force-blue!",
      },
    },
  ];

  return (
    <div>
      {/* Card */}
      <div className="flex gap-10 lg:flex-row flex-col">
        <div className="w-full lg:w-1/2 mx-auto">
          <Card elt={post} cardStyles={cardStyles} displayAuthor={true} />
        </div>
        <div className="w-full lg:w-1/2 mx-auto">
          <ServicesCards servicesData={servicesData} />
        </div>
      </div>
    </div>
  );
}
