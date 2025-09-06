import CheckoutContent from "@/features/stripe/components/CheckoutContent";
import { Suspense } from "react";

export default function Checkout() {
  return (
    <Suspense
      fallback={
        <div className="h-full min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md mx-auto rounded-xl shadow-lg border p-8 flex flex-col items-center gap-6 bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
