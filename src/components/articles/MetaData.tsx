"use client";
import { Calendar, CircleUser, Clock } from "lucide-react";
import Category from "@/components/Category";

interface MetaDataProps {
  author?: {
    firstName: string;
    lastName: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  readingTime?: number;
  publishedAt?: string;
}

export default function MetaData({
  author,
  category,
  readingTime,
  publishedAt,
}: MetaDataProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>Publié le {publishedAt}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>{readingTime} min de lecture</span>
      </div>
      {author && (
        <div className="flex items-center gap-2">
          <CircleUser size={16} />
          <span>
            Par {author?.firstName} {author?.lastName}
          </span>
        </div>
      )}
      <Category category={category} />
    </div>
  );
}
