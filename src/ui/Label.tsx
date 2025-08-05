"use client";

export default function Label({
  htmlFor,
  content,
}: {
  htmlFor: string;
  content: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium peer-placeholder-shown:text-red-500"
    >
      {content}
    </label>
  );
}
