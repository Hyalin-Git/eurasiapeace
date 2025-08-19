"use client";
import Button from "@/ui/Button";
import { isEmpty } from "@/utils/isEmpty";
import {
  Calendar,
  Clock,
  FastForward,
  FileText,
  Medal,
  Monitor,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/fr";
import { useState } from "react";
import { createPortal } from "react-dom";
import RegisterModal from "./RegisterModal";
import Tag from "@/components/tags/Tag";
import { Formation } from "@/types";

export default function FormationAside({
  formation,
}: {
  formation: Formation;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalites = formation?.singleFormations?.apercuFormation?.modalite;
  const rythme =
    formation?.rythmesDeFormation?.nodes[0]?.name || "Non renseigné";
  const niveauformation = formation?.niveauxDeFormation?.nodes[0]?.name;
  const formateur = formation?.singleFormations?.formateur?.nodes[0];
  const recapitulatif = formation?.singleFormations?.recapitulatif?.dates;

  const tagContent = niveauformation ? niveauformation : "Aucun niveau requis";

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold line-clamp-1 mb-2">
          {formation?.title}
        </h3>
        <Tag
          icon={<Medal size={16} />}
          content={tagContent}
          className="text-sm! text-text-third"
        />
      </div>
      {/* Body */}
      <div className="flex flex-col gap-5 mt-4">
        <div className="bg-background-secondary p-4 border border-gray-200 rounded-lg">
          <span className="text-md font-bold">Récapitulatif</span>
          <ul className="flex flex-col gap-1 [&_li]:text-text-secondary [&_li]:text-sm [&_li]:flex [&_li]:items-center [&_li]:gap-2 mt-2 mb-2">
            <li>
              <Monitor size={16} />
              {modalites?.format}
            </li>
            <li>
              <Clock size={16} />
              Durée {modalites?.dureeFormation}h de formation
            </li>
            <li>
              <Users size={16} />
              {modalites?.nombreParticipants} personnes
            </li>
            <li>
              <FastForward size={16} />
              {rythme}
            </li>
          </ul>

          <span className="text-md font-bold">Particuliers</span>
          {!isEmpty(recapitulatif) ? (
            <ul className="flex flex-col gap-1 [&_li]:text-text-secondary [&_li]:text-sm [&_li]:flex [&_li]:items-center [&_li]:gap-2 mt-2 mb-2">
              {recapitulatif.map((date, idx) => (
                <li key={idx}>
                  <Calendar size={16} />
                  du{" "}
                  {moment(date?.startingDate).utc().format("ddd D MMM à HH:mm")}
                  {date?.endingDate && (
                    <>
                      {" au " +
                        moment(date.endingDate)
                          .utc()
                          .format("ddd D MMM à HH:mm")}
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <span className="flex gap-2 mt-2 mb-2 text-sm text-text-secondary">
              <Calendar size={16} />
              Aucune dates disponibles
            </span>
          )}

          <span className="text-md font-bold">Entreprises</span>
          <ul className="[&_li]:text-text-secondary [&_li]:text-sm [&_li]:flex [&_li]:items-center [&_li]:gap-2 mt-2">
            <li>
              <Calendar size={16} />
              Dates à convenir ensemble
            </li>
          </ul>
        </div>

        {formateur && (
          <div className="bg-background-secondary p-4 border border-gray-200 rounded-lg">
            <span className="text-md font-bold">Formateur</span>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={formateur.avatar.url || ""}
                alt={`${formateur.firstName} ${formateur.lastName}`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <span className="text-sm">
                  {formateur.firstName} {formateur.lastName}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="text-center">
          <Link
            href={"/contact"}
            className="underline text-[13px] text-btn-gold"
          >
            Besoin de contenu personnalisé ? Contactez nous
          </Link>
        </div>
        <div className="flex flex-col justify-center sm:flex-row lg:flex-col gap-2">
          <Button
            type="button"
            className="w-full sm:w-fit lg:w-full bg-transparent! border border-btn-gold text-btn-gold! hover:bg-btn-gold! hover:text-white! transition-all duration-300"
          >
            <FileText size={18} />
            Télécharger le programme
          </Button>

          <Button
            type="button"
            className="w-full sm:w-fit lg:w-full bg-btn-gold! hover:bg-btn-gold/90! transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <UserPlus size={18} />
            S&apos;inscrire
          </Button>
        </div>
      </div>
      {isOpen &&
        createPortal(
          <RegisterModal
            title={`Je m'inscris à ${formation?.title.toLowerCase()}`}
            setIsOpen={setIsOpen}
          />,
          document.body
        )}
    </div>
  );
}
