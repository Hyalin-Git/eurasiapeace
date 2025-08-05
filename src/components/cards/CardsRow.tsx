import CardRow from "@/components/cards/CardRow";
import { ElementProps } from "@/components/cards/types";

export default function CardsRow({ elements }: { elements: ElementProps[] }) {
  return (
    <div>
      {elements.length > 0 ? (
        <div className="space-y-3">
          {elements.map((elt: ElementProps, index: number) => (
            <CardRow key={index} element={elt} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">Aucun article trouvé</div>
      )}
    </div>
  );
}
