export default function InfoBoxColumn({
  icon,
  title,
  content,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  content: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full border border-gray-200 min-h-[130px] rounded-lg overflow-hidden shadow-xs flex-col ${className}`}
    >
      <div className="bg-gray-100 p-6 flex items-center gap-2 w-full justify-start">
        {icon}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div
        className="w-full sm:w-3/4 bg-white p-6 text-sm space-y-5"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
