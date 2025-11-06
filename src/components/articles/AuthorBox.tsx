import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Author {
  lastName: string;
  firstName: string;
  description: string;
  avatar: {
    url: string;
  };
  customAvatar: string;
}

export default function AuthorBox({ author }: { author: Author }) {
  const avatarUrl = author?.avatar?.url;
  const authorCustomAvatar = author?.customAvatar;
  const name = author?.firstName + " " + author?.lastName;
  const description = author?.description || "Biographie non renseignée";

  if (!author?.firstName || !author?.lastName) return null;

  return (
    <div className="mt-10 mb-10 rounded-lg p-6 bg-background-third border border-border-primary shadow-sm animate-fadeIn relative overflow-hidden">
      {/* Accent décoratif */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-midnight-green to-background-light-blue"></div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-midnight-green rounded-full flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">
          À propos de l&apos;auteur
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative group">
          <div className="bg-gradient-to-r from-midnight-green to-background-light-blue w-fit rounded-full p-0.5 group-hover:animate-pulse">
            <Image
              src={authorCustomAvatar || avatarUrl || "/default-avatar.webp"}
              alt={name}
              width={80}
              height={80}
              quality={95}
              className="relative rounded-full aspect-square w-20 h-20 object-cover shadow-md"
            />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <h4 className="text-xl font-semibold bg-gradient-to-r from-midnight-green to-text-third bg-clip-text text-transparent">
            {name}
          </h4>
          <p className="text-text-secondary leading-relaxed">{description}</p>

          {/* Badge décoratif */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-border-primary shadow-sm">
            <div className="w-2 h-2 bg-midnight-green rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-text-third">
              Auteur vérifié
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
