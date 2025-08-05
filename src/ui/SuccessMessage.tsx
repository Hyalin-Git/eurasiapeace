import { CircleCheck } from "lucide-react";

export default function SuccessMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-green-100 p-2 rounded-lg my-4">
      <i className="block text-green-800 text-xs text-center">{children}</i>
    </div>
  );
}
