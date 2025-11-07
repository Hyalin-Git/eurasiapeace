import Image from "next/image";
import { useState } from "react";

export default function Picture({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [avatarSrc, setAvatarSrc] = useState<string>(
    src || "/default-avatar.webp"
  );

  return (
    <Image
      src={avatarSrc}
      alt={alt}
      width={width}
      height={height}
      quality={95}
      className={`rounded-full aspect-square object-cover ${className}`}
      onError={(e) => setAvatarSrc("/default-avatar.webp")}
    />
  );
}
