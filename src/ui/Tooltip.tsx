"use client";

export default function Tooltip({
  content,
  icon,
  className,
}: {
  content: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded-md bg-white shadow-md border border-gray-200 max-w-[180px] ${className}`}
    >
      <span className="text-text-secondary flex items-center gap-2 text-sm">
        {icon}
        {content}
      </span>
    </div>
  );
}
