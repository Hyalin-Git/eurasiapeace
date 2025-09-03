import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function BannerCTA({
  title = "Vous souhaitez publier votre article ?",
  href = "/contact",
}: {
  title: string;
  href: string;
}) {
  const isSubscription = href === "/abonnements";

  return (
    <div className="w-full bg-gradient-to-r from-background-dark-blue to-background-light-blue rounded-none px-8 py-5 flex items-center justify-center shadow-md border-b border-white/20 backdrop-blur-sm">
      <div className="flex items-center justify-between w-full container mx-auto gap-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <span className="text-white font-semibold text-lg leading-tight">
            {title}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-white/80 text-base mb-1">
            Notre équipe éditoriale vous accompagne
          </span>

          <Link
            href={href}
            className="text-white font-bold text-base px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors shadow"
          >
            {isSubscription ? "Abonnez-vous" : "Contactez-nous"} dès maintenant
            !
          </Link>
        </div>
      </div>
    </div>
  );
}
