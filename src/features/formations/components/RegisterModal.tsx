import { X } from "lucide-react";

export default function RegisterModal({
  title,
  setIsOpen,
}: {
  title: string;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="relative w-full h-full px-4" id="modal">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-51 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-[620px]">
        <X
          size={24}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <div className="p-8 mt-2">
          <span className="block text-2xl font-bold max-w-[700px] mb-8">
            {title}
          </span>
          {/* <Form>
            <div></div>
          </Form> */}
        </div>
      </div>
      {/* transparent background */}
      <div
        className="fixed top-0 left-0 z-50 bg-white/50 h-full w-full backdrop-blur-xs"
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}
