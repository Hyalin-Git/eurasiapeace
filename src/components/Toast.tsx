"use client";
import Portal from "@/components/Portal";
import { useEffect } from "react";

export default function Toast({
  showToast,
  setShowToast,
  success,
  message,
}: {
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  success: boolean;
  message: string;
}) {
  const title = success ? "Succès" : "Erreur";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast, setShowToast]);

  return (
    <Portal>
      <div
        className={`fixed bottom-10 left-10 bg-white border border-gray-200 rounded-lg p-4 translate-0 shadow-xs transition-all duration-300 ${
          showToast ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="font-semibold text-red-500">{title}</h1>
        <p className="text-gray-700 mt-2">{message}</p>
      </div>
    </Portal>
  );
}
