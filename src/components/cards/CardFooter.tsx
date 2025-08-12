import Button from "@/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CardFooter({
  variant = "article",
}: {
  variant: "article" | "formation";
}) {
  return (
    <div className="flex items-center justify-end">
      {variant === "article" && <ArticleVariant />}
      {variant === "formation" && <FormationVariant />}
    </div>
  );
}

function ArticleVariant() {
  return (
    <span className="flex items-center gap-2 text-sm underline text-btn-force-blue group-hover:text-text-third/80 group-hover:translate-x-1 transition-all duration-300">
      En savoir plus <ArrowRight size={16} />
    </span>
  );
}

function FormationVariant() {
  return (
    <div className="mt-6">
      <Button
        type="button"
        className="absolute z-0 right-0 bottom-0 rounded-bl-none rounded-tr-none shadow-sm group-hover:bg-midnight-green/90 group-hover:shadow-md transition-all duration-300"
      >
        Découvrir cette formation{" "}
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-all duration-300"
        />
      </Button>
    </div>
  );
}
