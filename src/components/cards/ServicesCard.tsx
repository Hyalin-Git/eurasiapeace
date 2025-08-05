import Button from "@/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Service } from "./types";

export default function ServicesCard({
  service,
  classNameToChild,
}: {
  service: Service;
  classNameToChild: string;
}) {
  return (
    <Link
      key={service?.id}
      href={service?.href}
      className={`group border border-gray-200 rounded-xl  hover:shadow-sm transition-all duration-180 flex flex-col justify-between ${classNameToChild} ${service?.className?.background} ${service?.className?.backgroundHover}`}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          {service?.icon}
          <h2 className="text-2xl font-bold text-text-primary">
            {service?.title}
          </h2>
        </div>
        <p className="mt-2 text-text-primary">{service?.description}</p>
      </div>
      <div className="flex justify-end">
        <Button
          className={`flex items-center gap-2 rounded-bl-none rounded-tr-none ${service?.className?.button}`}
          type="button"
        >
          {service?.button?.label}{" "}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-all duration-180"
          />
        </Button>
      </div>
    </Link>
  );
}
