"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function FormFields({
  label,
  id,
  icon,
  type,
  placeholder,
  required,
  defaultValue = "",
  error,
  className = "",
}: {
  label: string;
  id: string;
  icon?: React.ReactNode;
  type: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
  error?: string;
  className?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  return (
    <div className="group w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className={`text-sm transition-all duration-300 group-focus-within:text-black ${
          inputValue ? "text-black" : "text-text-secondary "
        }`}
      >
        {label}
      </label>

      {/* Icon */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary order-3">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-full border-b py-2 transition-all duration-300 group-focus-within:border-black placeholder:text-text-secondary placeholder:font-medium placeholder:text-[15px] ${
            inputValue ? "border-black" : "border-gray-400/80"
          } ${error ? "border-red-500!" : ""} ${className}`}
        />

        {/* Password visibility */}
        {type === "password" && (
          <>
            {showPassword ? (
              <Eye
                size={20}
                className="absolute right-3 bottom-2 text-text-secondary"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                size={20}
                className="absolute right-3 bottom-2 text-text-secondary"
                onClick={() => setShowPassword(true)}
              />
            )}
          </>
        )}
      </div>

      {/* Error message */}
      {error && <i className="block mt-2 text-red-500 text-xs">{error}</i>}
    </div>
  );
}
