"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SocialMedia({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="grid grid-cols-5 gap-5">
        <Link
          href="https://x.com/eurasia_peace"
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
        <Link
          href={"https://fr.linkedin.com/company/eurasiapeace"}
          target="_blank"
          className="flex-1 cursor-pointer rounded transition-colors"
        >
          <Image
            src="/social-media/icon-linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
          />
        </Link>
        <Link
          href="https://www.facebook.com/profile.php?id=61580972964723"
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
          href="https://www.instagram.com/eurasiapeace/"
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
      </div>
    </div>
  );
}
