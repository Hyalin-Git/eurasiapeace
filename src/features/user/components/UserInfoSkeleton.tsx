import Section from "@/components/Section";
import { User2 } from "lucide-react";

export default function UserInfoSkeleton() {
  return (
    <Section
      icon={<User2 className="text-btn-force-blue" />}
      title="Profil"
      description="Vos informations personnelles et votre statut."
      className="pt-0!"
    >
      <div className="flex justify-between items-baseline flex-col md:flex-row">
        <div className="flex gap-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 bg-gray-200 animate-pulse" />
          <div className="mt-2 space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-36 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex gap-2 w-32 h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </Section>
  );
}
