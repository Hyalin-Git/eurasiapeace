"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SocialMedia({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="grid grid-cols-5 gap-5">
        <Link
          href="https://x.com/sharer/sharer.php?u=https://eurasiapeace.org"
          target="_blank"
          className="flex-1 cursor-pointer rounded transition-colors"
        >
          <Image
            src="/social-media/icon-x-twitter.svg"
            alt="X / Twitter"
            width={32}
            height={32}
          />
        </Link>
        <button className="flex-1 cursor-pointer rounded transition-colors">
          <Image
            src="/social-media/icon-linkedin.svg"
            alt="Facebook"
            width={32}
            height={32}
          />
        </button>
        <Link
          href="https://www.facebook.com/sharer/sharer.php?u=https://eurasiapeace.org"
          target="_blank"
          className="flex-1 cursor-pointer rounded transition-colors"
        >
          <Image
            src="/social-media/icon-facebook.svg"
            alt="Facebook"
            width={32}
            height={32}
          />
        </Link>
        <Link
          href="https://www.instagram.com/sharer/sharer.php?u=https://eurasiapeace.org"
          target="_blank"
          className="flex-1 cursor-pointer rounded transition-colors"
        >
          <Image
            src="/social-media/icon-instagram.svg"
            alt="Instagram"
            width={32}
            height={32}
          />
        </Link>
        <Link
          href="https://www.youtube.com/sharer/sharer.php?u=https://eurasiapeace.org"
          target="_blank"
          className="flex-1 cursor-pointer rounded transition-colors"
        >
          <Image
            src="/social-media/icon-youtube.svg"
            alt="Youtube"
            width={32}
            height={32}
          />
        </Link>
      </div>
    </div>
  );
}
