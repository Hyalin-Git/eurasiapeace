import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function PublishCTA() {
  return (
    <div className="fixed right-4 bottom-24 bg-gradient-to-r from-background-dark-blue to-background-light-blue rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-white/20 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg">
          <Newspaper className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-medium text-sm leading-tight">
            Vous souhaitez publier votre article ?
          </p>
          <Link
            href={"/contact"}
            className="text-white/80 text-xs mt-1 before:absolute before:z-1 before:content-[''] before:top-0 before:left-0 before:right-0 before:bottom-0"
          >
            Contactez-nous dès maintenant !
          </Link>
        </div>
      </div>
    </div>
  );
}
