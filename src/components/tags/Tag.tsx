export default function Tag({
  icon,
  content,
  truncated = false,
  className,
}: {
  icon?: React.ReactNode;
  content: string;
  truncated?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded-sm text-xs font-medium bg-background-third text-text-primary w-fit shadow-xs ${
        truncated ? "max-w-[120px]" : ""
      } ${className}`}
    >
      {icon}
      <span className={truncated ? "truncate" : ""}>{content}</span>
    </div>
  );
}
