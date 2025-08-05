import Link from "next/link";
import React from "react";

export default function Paywall() {
  return (
    <div className="mt-8 mb-12 bg-gradient-to-br from-blue-400 to-blue-900 border border-amber-200 rounded-lg p-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-2xl font-bold text-white">Contenu Premium</h3>
      </div>
      <p className="text-white mb-6">
        L&apos;analyse complète et les recommandations stratégiques sont
        réservées aux membres premium. Accédez à l&apos;intégralité de nos
        recherches géopolitiques.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/abonnements"
          className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          Découvrir nos abonnements
        </Link>
        <Link
          href="/connexion"
          className="bg-white text-amber-600 px-6 py-3 rounded-lg font-medium border border-amber-600 hover:bg-amber-50 transition-colors"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
