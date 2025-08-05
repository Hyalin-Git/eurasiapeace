"use client";

export default function Textarea({
  placeholder,
  id = "message",
}: {
  placeholder: string;
  id?: string;
}) {
  return (
    <textarea
      id={id}
      rows={4}
      className="w-full pl-2 pr-4 py-3 mt-4 border border-gray-300 rounded-lg"
      placeholder={placeholder}
    />
  );
}
