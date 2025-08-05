import { Clock, Users } from "lucide-react";

export default function MetaFormation({
  metaFormation,
}: {
  metaFormation: {
    dureeFormation: string;
    nombreParticipants: string;
  };
}) {
  return (
    <div className="flex items-center gap-4 text-sm *:text-text-secondary *:flex *:items-center *:gap-1">
      <span>
        <Users size={16} /> {metaFormation.nombreParticipants} personnes
      </span>
      <span>
        <Clock size={16} /> durée {metaFormation.dureeFormation} heures
      </span>
    </div>
  );
}
