export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-red-100 p-2 rounded-md my-4">
      <p className="flex flex-col items-center justify-center gap-2 text-red-500 text-center text-xs italic">
        {children}
      </p>
    </div>
  );
}
