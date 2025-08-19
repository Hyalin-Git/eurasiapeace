import Section from "@/components/Section";
import { Settings2 } from "lucide-react";
import { isEmpty } from "@/utils/isEmpty";
import InfoBoxColumn from "@/features/formations/components/InfoBoxColumn";
import { Formation } from "@/types";
import Link from "next/link";

export default function Modalities({ formation }: { formation: Formation }) {
  const modalites = formation?.singleFormations?.modalites;
  const boiteModalites = modalites?.boiteModalites;
  const tarifs = modalites?.tarifs;
  const particulierProgressif = tarifs?.particulierProgressif;
  const particulierIntensif = tarifs?.particulierIntensif;
  const entrepriseProgressif = tarifs?.entrepriseProgressif;
  const entrepriseIntensif = tarifs?.entrepriseIntensif;
  const payPerSession = tarifs?.payPerSession;

  function renderTarifsContent() {
    return (
      <div className="overflow-hidden">
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="p-3 text-left font-semibold"></th>
              <th className="p-3 text-center font-semibold">Progressif</th>
              <th className="p-3 text-center font-semibold">Intensif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 font-medium">Particulier</td>
              <td className="p-3 text-center">
                <span className="bg-gray-200 px-1 py-1 rounded font-medium">
                  {particulierProgressif + " €" || "420 €"}
                </span>
              </td>
              <td className="p-3 text-center">
                <span className="bg-gray-200 px-1 py-1 rounded font-medium">
                  {particulierIntensif + " €" || "600 €"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Entreprise</td>
              <td className="p-3 text-center">
                <span className="bg-gray-200 px-1 py-1 rounded font-medium">
                  {entrepriseProgressif + " €" || "800 €"}
                </span>
              </td>
              <td className="p-3 text-center">
                <span className="bg-gray-200 px-1 py-1 rounded font-medium">
                  {entrepriseIntensif + " €" || "1200 €"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        {payPerSession && (
          <i className="block mb-2">
            Paiement à la séance disponible pour cette formation *
          </i>
        )}
        <i>
          Une réduction de 15% est appliquée aux particuliers abonnés à
          EurasiaPeace -{" "}
          <Link href={"/abonnements"} className="underline text-btn-gold">
            Abonnez-vous pour 12€ par an
          </Link>
        </i>
      </div>
    );
  }

  return (
    <div id="modalities">
      <Section
        icon={<Settings2 size={44} className="text-text-primary" />}
        title="Modalités"
        className="[&_h2]:mb-6 pb-0! pt-8!"
      >
        <div className="flex flex-col gap-6">
          {!isEmpty(boiteModalites) &&
            boiteModalites.map((boite, idx) => (
              <InfoBoxColumn
                key={idx}
                title={boite.titreBoite}
                content={boite.descriptionModalite}
              />
            ))}
          <InfoBoxColumn title="Tarifs" content={renderTarifsContent()} />
        </div>
      </Section>
    </div>
  );
}
