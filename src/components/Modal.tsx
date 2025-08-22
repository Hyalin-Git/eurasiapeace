import { X } from "lucide-react";

export default function Modal({
  setIsOpen,
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="relative w-full h-full" id="modal">
      <div className="fixed z-99 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg w-full max-w-lg border border-gray-200 p-4">
        <div className="flex justify-between">
          <div className="text-lg font-medium max-w-md">{title}</div>
          <X
            size={24}
            className="relative -top-1 -right-1 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="mt-8">{children}</div>
      </div>

      {/* Semi transparent background */}
      <div
        className="fixed inset-0 bg-black/30 z-98"
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}
