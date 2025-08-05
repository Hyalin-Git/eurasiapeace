"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Dropdown({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="flex justify-between items-center bg-gray-100 p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-text-primary">{title}</h3>
        <ChevronDown
          size={24}
          className={`text-btn-gold transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">
          <p className="text-sm text-gray-500">{content}</p>
        </div>
      </div>
    </div>
  );
}
