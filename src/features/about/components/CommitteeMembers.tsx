"use server";

import CommiteeMember from "./CommitteeMember";

export default async function CommitteMembers() {
  // TODO : GraphQL query to fetch members

  const members = [
    {
      picture: "/default-avatar.webp",
      name: "Vladimir Kozlov",
      title: "Président du comité scientifique",
      expertise: "Anthropologie politique",
      bio: "Professeur d'anthropologie politique, spécialisé dans les sociétés post-soviétiques et les dynamiques de paix.",
    },
    {
      picture: "/default-avatar.webp",
      name: "Fatima Al-Rashid",
      title: "Membre senior",
      expertise: "Économie géopolitique",
      bio: "Économiste spécialisée dans les routes commerciales eurasiennes et les enjeux énergétiques.",
    },
    {
      picture: "/default-avatar.webp",
      name: "Chen Wei-Ming",
      title: "Conseiller scientifique",
      expertise: "Relations sino-européennes",
      bio: "Expert en relations sino-européennes et en initiatives de coopération intercontinentale.",
    },
    {
      picture: "/default-avatar.webp",
      name: "Sarah Thompson",
      title: "Membre associée",
      expertise: "Résolution de conflits",
      bio: "Spécialiste en médiation internationale et processus de paix, ancienne conseillère ONU.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {members.map((member, idx) => (
        <CommiteeMember key={idx} member={member} />
      ))}
    </div>
  );
}
