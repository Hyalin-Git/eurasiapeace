"use client";

export default function Form({
  formRef,
  action,
  children,
  className,
}: {
  formRef?: React.RefObject<HTMLFormElement | null>;
  action: (formData: FormData) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form ref={formRef} action={action} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
}
