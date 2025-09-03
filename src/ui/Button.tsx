"use client";

export default function Button({
  type = "button",
  className,
  children,
  onClick,
  disabled = false,
}: {
  type: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-midnight-green text-white px-4 py-2 rounded-md cursor-pointer flex items-center justify-center gap-2 hover:bg-midnight-green/90 transition-colors duration-300 ${
        disabled ? "bg-midnight-green/50!" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
