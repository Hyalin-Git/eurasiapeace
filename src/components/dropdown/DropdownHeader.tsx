"use client";

export default function DropdownHeader({
  children,
  isOpen,
  floatingConfig,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  floatingConfig: {
    refs: {
      setFloating: (node: HTMLDivElement | null) => void;
    };
    floatingStyles: React.CSSProperties;
  };
  className?: string;
}) {
  return (
    <div
      ref={floatingConfig.refs.setFloating}
      style={floatingConfig.floatingStyles}
      className={`bg-background-primary rounded-lg shadow-md w-full border border-border-primary transition-all duration-100 ease-in-out ${className} ${
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-[-10px]"
      }`}
    >
      {children}
    </div>
  );
}
