import Button from "@/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CardFooter({ variant }: { variant: string }) {
  return (
    <div
      className={`flex items-center justify-end ${
        variant === "formation" && "mt-6"
      } `}
    >
      {variant === "publication" && (
        <span className="flex items-center gap-2 text-sm underline text-btn-force-blue group-hover:text-text-third/80 group-hover:translate-x-1 transition-all duration-300">
          En savoir plus <ArrowRight size={16} />
        </span>
      )}
      {variant === "formation" && (
        <Button
          type="button"
          className="absolute right-0 bottom-0 rounded-bl-none rounded-tr-none shadow-sm group-hover:bg-midnight-green/90 group-hover:shadow-md transition-all duration-300"
        >
          Découvrir cette formation{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-all duration-300"
          />
        </Button>
      )}
    </div>
  );
}
