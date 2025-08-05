"use client";
import React, { useState } from "react";
import Tag from "./Tag";
import { offset, useFloating } from "@floating-ui/react";
import Tooltip from "@/ui/Tooltip";

export default function Tags({
  tags,
  sliced = false,
  truncated = false,
  className,
}: {
  tags: { name: string }[];
  sliced?: boolean;
  truncated?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(10)],
  });

  if (tags?.length === 0) return null;

  return (
    <div className={`relative flex flex-wrap gap-2 z-50 ${className}`}>
      {sliced
        ? tags
            .slice(0, 2)
            .map((tag, idx) => (
              <Tag key={idx} content={tag?.name} truncated={truncated} />
            ))
        : tags.map((tag, idx) => (
            <Tag key={idx} content={tag?.name} truncated={truncated} />
          ))}
      {sliced && tags.length > 2 && (
        <>
          <div
            ref={refs.setReference}
              onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Tag content={`+ ${tags.length - 2}`} />
          </div>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="animate-fadeIn z-50"
            >
              <Tooltip
                content={tags
                  ?.slice(2)
                  .map((tag) => tag.name)
                  .join(", ")}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
