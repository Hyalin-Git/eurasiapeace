"use client";

export default function TextareaField({
  placeholder,
  label,
  id,
  error,
  defaultValue,
}: {
  placeholder: string;
  label: string;
  id: string;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <div className="group w-full">
      <label
        htmlFor={id}
        className={`text-sm transition-all duration-300 group-focus-within:text-black ${
          defaultValue ? "text-black" : "text-text-secondary "
        }`}
      >
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        rows={4}
        className={`w-full pl-2 pr-4 py-3 mt-2 border rounded-md transition-all duration-300 group-focus-within:border-black placeholder:text-text-secondary placeholder:font-medium placeholder:text-[15px] ${
          defaultValue ? "border-black" : "border-gray-400/80"
        } ${error ? "border-red-500!" : ""}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      {error && <i className="text-red-500 text-sm w-fit">{error}</i>}
    </div>
  );
}

// <label
//         htmlFor={id}
//         className={`text-sm transition-all duration-300 group-focus-within:text-black ${
//           value ? "text-black" : "text-text-secondary "
//         }`}
//       >
//         {label}
//       </label>

//       <textarea
//         id={id}
//         name={id}
//         rows={4}
//         className={`w-full pl-2 pr-4 py-3 mt-2 border rounded-md transition-all duration-300 group-focus-within:border-black placeholder:text-text-secondary placeholder:font-medium placeholder:text-[15px] ${
//           value ? "border-black" : "border-gray-400/80"
//         } ${error ? "border-red-500!" : ""}`}
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
