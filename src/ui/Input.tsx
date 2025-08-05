"use client";

export default function Input({
  type,
  id,
  className = "",
  configs = {
    onChange: () => {},
    isRequired: true,
    value: "",
    placeholder: "",
    icon: null,
  },
}: {
  type: string;
  id: string;
  className?: string;
  configs: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    value?: string;
    placeholder: string;
    icon?: React.ReactNode;
  };
}) {
  return (
    <div className="relative">
      {configs.icon}
      <input
        type={type}
        id={id}
        className={`w-full py-3 pl-10 border border-gray-300 rounded-md focus:border-midnight-green focus:ring-transparent peer ${className}`}
        placeholder={configs.placeholder}
        required={configs.isRequired}
        value={configs.value}
        onChange={configs.onChange}
      />
    </div>
  );
}
