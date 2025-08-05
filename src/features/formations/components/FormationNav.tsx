"use client";

import Link from "next/link";
import { useState } from "react";

export default function FormationNav() {
  const [activeAnchor, setActiveAnchor] = useState("");

  function handleAnchor(anchor: string) {
    setActiveAnchor(anchor);
  }

  return (
    <div className="sticky mt-[-40px] top-20 py-10 bg-gradient-to-b from-background-secondary via-background-secondary to-transparent z-10">
      <div className="flex flex-col sm:flex-row bg-white border divide-y sm:divide-x sm:divide-y-0 divide-gray-200 border-gray-200 rounded-lg h-auto sm:h-12 sm:overflow-hidden">
        <Link
          href="#overview"
          onClick={() => handleAnchor("#overview")}
          className={`w-full sm:w-1/5 text-center sm:h-full py-3 sm:py-0 flex items-center justify-center transition-colors hover:bg-gray-100 ${
            activeAnchor === "#overview" ? "active-anchor" : ""
          }`}
        >
          <span
            className={`${
              activeAnchor === "#overview"
                ? "text-black"
                : "text-text-secondary"
            }`}
          >
            Aperçu
          </span>
        </Link>
        <Link
          href="#objectives"
          onClick={() => handleAnchor("#objectives")}
          className={`w-full sm:w-1/5 text-center sm:h-full py-3 sm:py-0 flex items-center justify-center transition-colors hover:bg-gray-100 ${
            activeAnchor === "#objectives" ? "active-anchor" : ""
          }`}
        >
          <span
            className={`${
              activeAnchor === "#objectives"
                ? "text-black"
                : "text-text-secondary"
            }`}
          >
            Objectifs
          </span>
        </Link>
        <Link
          href="#programme"
          onClick={() => handleAnchor("#programme")}
          className={`w-full sm:w-1/5 text-center sm:h-full py-3 sm:py-0 flex items-center justify-center transition-colors hover:bg-gray-100 ${
            activeAnchor === "#programme" ? "active-anchor" : ""
          }`}
        >
          <span
            className={`${
              activeAnchor === "#programme"
                ? "text-black"
                : "text-text-secondary"
            }`}
          >
            Programme
          </span>
        </Link>
        <Link
          href="#evaluation"
          onClick={() => handleAnchor("#evaluation")}
          className={`w-full sm:w-1/5 text-center sm:h-full py-3 sm:py-0 flex items-center justify-center transition-colors hover:bg-gray-100 ${
            activeAnchor === "#evaluation" ? "active-anchor" : ""
          }`}
        >
          <span
            className={`${
              activeAnchor === "#evaluation"
                ? "text-black"
                : "text-text-secondary"
            }`}
          >
            Évaluation
          </span>
        </Link>
        <Link
          href="#modalities"
          onClick={() => handleAnchor("#modalities")}
          className={`w-full sm:w-1/5 text-center sm:h-full py-3 sm:py-0 flex items-center justify-center transition-colors hover:bg-gray-100 ${
            activeAnchor === "#modalities" ? "active-anchor" : ""
          }`}
        >
          <span
            className={`${
              activeAnchor === "#modalities"
                ? "text-black"
                : "text-text-secondary"
            }`}
          >
            Modalités
          </span>
        </Link>
      </div>
    </div>
  );
}
