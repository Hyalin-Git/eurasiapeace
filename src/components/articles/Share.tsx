"use client";

import { Copy, Check } from "lucide-react";
import React, { useState } from "react";

export default function SocialShare() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        console.log("Link copié avec succès !");

        // Réinitialiser l'état après 2 secondes
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du lien:", err);
      });
  }

  function handleShare(platform: string) {
    const currentUrl = window.location.href;
    const title = document.title;

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      default:
        console.log("Plateforme non supportée");
        return;
    }

    // Ouvrir la fenêtre de partage
    window.open(
      shareUrl,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={copyLink}
        className={`text-gray-500 cursor-pointer p-1.5 rounded transition-colors ${
          copied
            ? "bg-green-200 text-green-600 hover:bg-green-300"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        title={copied ? "Lien copié !" : "Copier le lien"}
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
      </button>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleShare("twitter")}
          className="flex-1 bg-blue-400 text-white cursor-pointer p-2 rounded hover:bg-blue-500 transition-colors"
          title="Partager sur Twitter"
        >
          <svg
            className="w-4 h-4 mx-auto"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="flex-1 bg-blue-600 text-white cursor-pointer p-2 rounded hover:bg-blue-700 transition-colors"
          title="Partager sur LinkedIn"
        >
          <svg
            className="w-4 h-4 mx-auto"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="flex-1 bg-blue-800 text-white cursor-pointer p-2 rounded hover:bg-blue-900 transition-colors"
          title="Partager sur Facebook"
        >
          <svg
            className="w-4 h-4 mx-auto"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
