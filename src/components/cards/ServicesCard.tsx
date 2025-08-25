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
    <div
      className={`relative group border border-gray-200 rounded-xl  hover:shadow-sm transition-all duration-180 flex flex-col justify-between ${classNameToChild} ${service?.className?.background} ${service?.className?.backgroundHover}`}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          {service?.icon}
          {service?.href ? (
            <Link
              key={service?.id}
              href={service?.href}
              className="font-bold text-text-primary text-2xl before:content-[''] before:absolute before:inset-0 before:z-1 before:left-0 before:bottom-0 before:w-full before:h-full"
            >
              {service?.title}
            </Link>
          ) : (
            <span className="font-bold text-text-primary text-2xl">
              {service?.title}
            </span>
          )}
        </div>
        <p className="mt-2 text-text-primary">{service?.description}</p>
      </div>
      {service?.button && (
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
      )}
    </div>
  );
}
