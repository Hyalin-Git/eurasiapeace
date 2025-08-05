import ServicesCard from "./ServicesCard";
import { Service, ServicesProps } from "./types";

export default function ServicesCards({
  servicesData,
  className,
  classNameToChild,
}: ServicesProps) {
  return (
    <div
      className={`flex flex-col h-full text-left justify-between gap-5 ${className}`}
    >
      {servicesData.map((service: Service) => (
        <ServicesCard
          key={service?.id}
          service={service}
          classNameToChild={classNameToChild || ""}
        />
      ))}
    </div>
  );
}
