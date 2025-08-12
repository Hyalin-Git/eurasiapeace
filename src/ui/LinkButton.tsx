import Link from "next/link";

export default function LinkButton({
  href,
  icon,
  label,
  className,
}: {
  href: string;
  icon?: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={`flex gap-2 justify-center items-center w-fit mx-auto bg-btn-force-blue text-white font-[500] px-4 py-2 rounded-md hover:bg-btn-force-blue-hover transition-all duration-300 ${className}`}
    >
      {icon}
      {label}
    </Link>
  );
}
