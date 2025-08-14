import Section from "@/components/Section";
import { Settings2 } from "lucide-react";
import { isEmpty } from "@/utils/isEmpty";
import InfoBoxColumn from "@/features/formations/components/InfoBoxColumn";
import { Formation } from "@/types";

export default function Modalities({ formation }: { formation: Formation }) {
  const modalites = formation.singleFormations.modalites;
  const boiteModalites = modalites?.boiteModalites;
  const tarifs = modalites?.tarifs;
  const particulierProgressif = tarifs?.particulierProgressif;
  const particulierIntensif = tarifs?.particulierIntensif;
  const entrepriseProgressif = tarifs?.entrepriseProgressif;
  const entrepriseIntensif = tarifs?.entrepriseIntensif;

  const tarifsContent = `
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th style="padding: 12px; text-align: left; font-weight: 600;"></th>
            <th style="padding: 12px; text-align: center; font-weight: 600;">Progressif</th>
            <th style="padding: 12px; text-align: center; font-weight: 600;">Intensif</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; font-weight: 500;">Particulier</td>
            <td style="padding: 12px; text-align: center;">
              <span style="background-color: #e9ecef; padding: 4px; border-radius: 4px; font-weight: 500;">${
                particulierProgressif + " €" || "420 €"
              }</span>
            </td>
            <td style="padding: 12px; text-align: center;">
              <span style="background-color: #e9ecef; padding: 4px; border-radius: 4px; font-weight: 500;">${
                particulierIntensif + " €" || "600 €"
              }</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: 500;">Entreprise</td>
            <td style="padding: 12px; text-align: center;">
              <span style="background-color: #e9ecef; padding: 4px; border-radius: 4px; font-weight: 500;">${
                entrepriseProgressif + " €" || "800 €"
              }</span>
            </td>
            <td style="padding: 12px; text-align: center;">
              <span style="background-color: #e9ecef; padding: 4px; border-radius: 4px; font-weight: 500;">${
                entrepriseIntensif + " €" || "1200 €"
              }</span>
            </td>
          </tr>
        </tbody>
      </table>
         <p>
          Une réduction de 15% est appliquée aux particuliers abonnés à
          EurasiaPeace - Abonnez-vous pour 12€ par an !
        </p>
    </div>
  `;

  return (
    <div id="modalities">
      <Section
        icon={<Settings2 size={44} className="text-text-primary" />}
        title="Modalités"
        className="pb-0! pt-8!"
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
          <InfoBoxColumn title="Tarifs" content={tarifsContent} />
        </div>
      </Section>
    </div>
  );
}
