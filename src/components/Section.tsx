export default function Section({
  icon,
  title,
  description,
  className,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`py-20 ${className}`}>
      <div>
        <div className="flex items-start gap-4">
          {icon && <span className="hidden sm:block">{icon}</span>}
          <h2 className="font-bold">{title}</h2>
        </div>
        <p
          className={`text-black/50 mt-2 mb-10 md:text-lg text-md max-w-2xl flex-1 ${
            description ? "" : "hidden"
          }`}
        >
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
