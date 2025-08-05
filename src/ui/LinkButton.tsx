import Link from "next/link";

export default function LinkButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`block w-fit mx-auto bg-btn-force-blue text-white font-[500] px-4 py-2 rounded-md hover:bg-btn-force-blue-hover transition-all duration-300 ${className}`}
    >
      {label}
    </Link>
  );
}
